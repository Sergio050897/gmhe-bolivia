import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { finalize } from 'rxjs/operators';
import { EnvioService } from 'src/app/core/service/envio.service';
import { ProductoService } from 'src/app/core/service/producto.service';
import { SucursalService } from 'src/app/core/service/sucursal.service';

@Component({
  selector: 'app-crear-envios',
  templateUrl: './crear-envios.component.html',
  styleUrls: ['./crear-envios.component.scss']
})
export class CrearEnviosComponent implements OnInit {
  form: FormGroup;
  sucursales: any;
  control: FormArray;
  envio_id: any;
  productos: any;
  submitted=false;
  isLoading=false;
  loadingScroll: boolean;

  get detalle(): FormArray {
    return this.form.get('detalle') as FormArray;
  }
  constructor(
    private formBuilder: FormBuilder,
    private sucursalService: SucursalService,
    private enviosService: EnvioService,
    private productoService: ProductoService,
    private toastr: ToastrService,
    public route: ActivatedRoute,
    private datePipe: DatePipe,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.route.paramMap
      .subscribe((paramMap: any) => {        
        this.envio_id = paramMap.get('id');
        console.log(this.envio_id);
      }
    );
    this.listSucursal();
    this.createForm();
    // this.listProductos(0);

    this.control = <FormArray>this.form.controls['detalle']; 

    // if(this.envio_id){
    //   this.enviosService.getById(this.envio_id).subscribe(data=>{
    //     console.log(data);
    //     this.form.patchValue({
    //       origen: data.origen,
    //       destino: data.destino,
    //       fecha_registro: this.datePipe.transform(data.fecha_registro,'yyyy-MM-dd'),
    //     })
    //     this.listProductos(data.sucursal_id);
    //     data.detalle.forEach((element,index) => {
    //       this.sumarUno();
    //       this.control.controls[index].patchValue({
    //         producto_id : element.producto_id,
    //         cantidad: element.cantidad,
    //         stock: element.producto.stock
    //       })
    //     });
    //   });      
    // }
    // else{
      this.sumarUno();
    // }
  }

  createForm(){
    this.form=this.formBuilder.group({
      origen: ['',[Validators.required]],
      destino: ['',[Validators.required]],
      fecha_registro:[this.datePipe.transform(Date.now(),'yyyy-MM-dd')],
      detalle: this.formBuilder.array([]),   
    })    
  }
  createFormDetalle():FormGroup{
    return this.formBuilder.group({
      producto_id:['',[Validators.required]],
      cantidad:['',[Validators.required, Validators.pattern('[0-9]*'), Validators.min(1)]],      
      stock:['',[]],      
    })

  }

  listSucursal(){
    this.sucursalService.getSucursal().subscribe(data =>{
      this.sucursales = data
      console.log(this.sucursales)
    });
  }
  listProductos(item){
    this.productoService.getProductosStock(item).subscribe(
      res => {
          this.productos= res;        
          console.log('productos',this.productos);         
      },
      error =>{
        console.log('Error' + error.error);
        this.loadingScroll = false;
      }
    )

  }
  sumarUno(){
    this.control.push(this.createFormDetalle());
  }

  restarUno(item: any) {
    for (let i = 0; i < this.control.controls.length; i++) {
      if (item === i) {
        (<FormArray>this.form.controls['detalle']).removeAt(i);
      }
    }
    console.log('forms',this.form.value);
    // this.sumarTotalTotal()
  }

  onProducto(item,index){
    console.log(item);
    this.control.controls[index].get('stock').setValue(item.stock); 
  }

  onSucursal(item){
    this.listProductos(item.sucursal_id);
  }

  register(form:any){
    this.isLoading=true;
    this.submitted=true;     
        this.enviosService.create(form)
      .pipe(    
        finalize(() => {
      
          this.form.markAsPristine();
          this.isLoading=false;
        })
      )
      .subscribe(
        data => {
          this.toastr.success(data.success, 'Dato Registrado Exitosamente');
          this.router.navigate(['/dashboard/envios/envios']); 
        },
        (error: any) => {
          this.toastr.error(error.error, 'Error');
        }
      );
  }
  
}
