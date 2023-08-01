import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { MarcaService } from 'src/app/core/service/marca.service';
import { finalize } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import { ProveedorService } from 'src/app/core/service/proveedor.service';
import { ProductoService } from 'src/app/core/service/producto.service';
import { CategoriaService } from 'src/app/core/service/categoria.service';


@Component({
  selector: 'app-crear-marcas',
  templateUrl: './crear-marcas.component.html',
  styleUrls: ['./crear-marcas.component.scss']
})
export class CrearMarcasComponent implements OnInit {

  proovedor:any;
  productos: any;
  form: FormGroup;
  //para recibir el mensaje de otro componente

  @Input() titulo: string;
  @Input() id: string;
  @Input() estado: boolean;
  isLoading = false;
  categorias: any;

  constructor(
    private basicService:MarcaService,
    private formBuilder: FormBuilder,
    public activeModal: NgbActiveModal,
    private toastr: ToastrService,
    private proveedorService:ProveedorService,
    private categoriaService:CategoriaService,
  ) { }

  ngOnInit(): void {
    this.listProvee();
    this.onCategoria();
    this.createForm();

      if(this.estado == true)
      {
        this.basicService.getById(this.id).subscribe(data => {
          // console.log(data);
          //pathvalue es para rellenar datos existentes al formulario
          this.form.patchValue({
            nombre: data.nombre,
            proveedor_id:data.proveedor_id,
            categoria_id: data.categoria_id,
          });
        });
      }
  }

  listProvee(){
    console.log("proveedor");
    this.proveedorService.getEnabledList().subscribe(
      data=>{
        this.proovedor=data;
        console.log(this.proovedor);
      }
    )
  }

  onCategoria(){
      this.categoriaService.getEnabledList().subscribe(data=>{
        this.categorias=data;
      })
  }


  registrarMarca(form: any) {
    this.isLoading = true;


    if(this.estado == true)
    {
      this.basicService
      .createWithFile(this.id, form)
      .pipe(
      finalize(() => {
        this.form.markAsPristine();
        this.isLoading = false;
      })
      )
      .subscribe(
      data => {
        this.toastr.success(data.succes, 'Su registro se actualizo satisfactoriamente!!');
        this.activeModal.close(data);
      },
      (error: any) => {
        this.toastr.error(error.error, 'Error');
      }
      );
      
    }
    else{
      this.basicService
      .create(form)
    .pipe(
      finalize(() => {
        this.form.markAsPristine();
        this.isLoading = false;
      })
    )
    .subscribe(
      data => {
        this.toastr.success(data.succes, 'Su registro se guardo satisfactoriamente!!');
        this.activeModal.close(data);
      },
      (error: any) => {
        this.toastr.error(error.error, 'Error');
      }
    );

    } 
  }

  createForm() {
    this.form = this.formBuilder.group({
      nombre: ['', Validators.required],
      proveedor_id:['',[Validators.required]],
      categoria_id:['',[Validators.required]],
    });
  }

}
