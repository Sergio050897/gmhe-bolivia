import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { finalize } from 'rxjs/operators';
import { TokenStorageService } from 'src/app/core/authentication/token-storage.service';
import { ProductoService } from 'src/app/core/service/producto.service';
import { ProformaService } from 'src/app/core/service/proforma.service';
import { UserService } from 'src/app/core/service/user.service';
import { environment } from 'src/environments/environment.prod';
import { RegisterComponent } from './register/register.component';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  cartProducts: any;
  modalOptions: NgbModalOptions = {};
  url= environment.imgUrl;
  user: any;
  form: FormGroup;
  control: any;
  submitted=false;
  isLoading=false;
  get detalle(): FormArray {
    return this.form.get('detalle') as FormArray;
  }

  constructor(public productoService:ProductoService,
    public tokenStorage: TokenStorageService,  
    public userService: UserService,
    private modalService: NgbModal,
    private formBuilder: FormBuilder,
    private proformaService: ProformaService,
    private toastr: ToastrService,
    private router: Router,
  ) { }

  ngOnInit(): void {   
    this.createForm();
    this.control = <FormArray>this.form.controls['detalle']; 
    this.getCartProduct();
    this.user = this.tokenStorage.getUser();
  
    console.log(this.control)
  }

  getCartProduct() {
    this.cartProducts = this.productoService.getLocalCartProducts();
    this.cartProducts.forEach((element,index)=>{
      this.sumarUno()
      this.control.controls[index].patchValue({
          producto_id: element.producto_id,
          nombre: element.nombre,
          img_url: element.img_url
      })
      
    })
    
  }

  removeCartProduct(product:any)
  {
    this.productoService.removeLocalCartProduct(product);

    // Recalling
    this.getCartProduct();

  }

  registerModal(){
    const modalRef = this.modalService.open(
      RegisterComponent,
      {
        size:'lg'
      }
    );
    modalRef.componentInstance.title = 'Inicia sesión / Regístrate';
  }

  sumarUno(){
    this.control.push(this.createFormDetalle());
  }

  createForm(){
    this.form=this.formBuilder.group({
      nit:[this.tokenStorage.getUser().cliente.nit,[Validators.required]],
      razon_social:[this.tokenStorage.getUser().cliente.razon_social,[Validators.required]], 
      telefono: [this.tokenStorage.getUser().cliente.celular,[Validators.required]], 
      direccion: [this.tokenStorage.getUser().cliente.direccion,[Validators.required]], 
      // cliente_id: [this.tokenStorage.getUser().cliente.cliente_id,[Validators.required]],
      detalle: this.formBuilder.array([]),
    })
  }

  createFormDetalle():FormGroup{
    return this.formBuilder.group({
      producto_id:['',[Validators.required]],
      nombre:['',[Validators.required]],
      img_url:['',[Validators.required]],
      cantidad:['',[Validators.required, Validators.pattern('[0-9]*')]],
    })

  }

  register(form:any){
    this.isLoading=true;
    this.submitted=true;
    this.proformaService.postProformaWeb(form)
      .pipe(    
        finalize(() => {
      
          this.form.markAsPristine();
          this.isLoading=false;
        })
      )
      .subscribe(
        data => {
          this.toastr.success(data.success, 'Dato Registrado Exitosamente');
          this.productoService.removeLocalCartAll();
          this.router.navigate(['/inicio/productos']);
        },
        (error: any) => {
          this.toastr.error(error.error, 'Error');
        }
      );      
  }
}
