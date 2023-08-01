import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { dateFormat } from 'highcharts';
import { ToastrService } from 'ngx-toastr';
import { finalize } from 'rxjs/operators';
import { IngresoService } from 'src/app/core/service/ingreso.service';
import { MonedaService } from 'src/app/core/service/moneda.service';
import { PedidoService } from 'src/app/core/service/pedido.service';
import { ProductoService } from 'src/app/core/service/producto.service';
import { ProveedorService } from 'src/app/core/service/proveedor.service';

@Component({
  selector: 'app-crear-pedidos',
  templateUrl: './crear-pedidos.component.html',
  styleUrls: ['./crear-pedidos.component.scss']
})
export class CrearPedidosComponent implements OnInit {

  form: FormGroup;
  proveedores:any
  submitted=false;
  isLoading=false;
  ingreso_id:any;
  control:any;
  productos: any;
  precio_compra:any;
  total: any;
  loadingScroll: boolean;
  monedas: any;
  array=[{
    "valor": 1,
    "tipo_moneda":"$US"
  },{
    "valor": 0,
    "tipo_moneda":"BS"
  }];
  totalDolar: number;
  itemProveedor: any;

  get detalle(): FormArray {
    return this.form.get('detalle') as FormArray;
  }

  constructor(
    private formBuilder: FormBuilder,
    private proveedorService: ProveedorService,
    private pedidosService: PedidoService,
    private toastr: ToastrService,
    public route: ActivatedRoute,
    public productoService: ProductoService,
    public monedaService: MonedaService,
    private router: Router,
    private datePipe: DatePipe
  ) { }

  ngOnInit(): void {
    this.route.paramMap
      .subscribe((paramMap: any) => {
        this.ingreso_id = paramMap.get('id');
        console.log(this.ingreso_id);
      }
    );
    this.createForm();
    this.listarProveedor();
    this.moneda();

    this.control = <FormArray>this.form.controls['detalle'];

    if(this.ingreso_id){
      this.pedidosService.getById(this.ingreso_id).subscribe(data=>{
        this.form.patchValue({
          codigo: data.codigo,
          fecha_pedido: this.datePipe.transform(data.fecha_pedido,'yyyy-MM-dd'),
          fecha_registro: this.datePipe.transform(data.fecha_registro,'yyyy-MM-dd'),
          proveedor_id: data.proveedor_id,
          total: data.total,
          total$US: data.total,
          dolar: data.dolar,
        })
        this.listProductos(this.form.get('proveedor_id').value)
        if (this.listProductos(this.form.get('proveedor_id').value)) {

          data.detalle.forEach((element,index) => {
            this.sumarUno();
            this.control.controls[index].patchValue({
              producto_id : element.producto_id,
              cantidad: element.cantidad,
              precio_compra: element.precio_compra,
              total: element.total,
              codigo: element.producto.codigo_texto,
              marca: element.producto.marca.nombre,
            })
          });
        }


        this.sumarTotalTotal();
      });

    }
    else{
      this.sumarUno();
    }


  }

  listarProveedor(){
    this.proveedorService.getEnabledList().subscribe(data => {
        this.proveedores = data;
        console.log(this.proveedores);
    })

  }
  moneda(){
    this.monedaService.getAll().subscribe(data => {
      this.monedas = data.cambio_moneda;
      console.log('moneda',this.monedas);
    })
  }
  createForm(){
    this.form=this.formBuilder.group({
      fecha_pedido:['',[Validators.required]],
      fecha_registro:[this.datePipe.transform(Date.now(),'yyyy-MM-dd')],
      proveedor_id:['',[Validators.required]],
      total:[''],
      total$US:[''],
      dolar:['',[Validators.required]],
      // estado:['',[Validators.required]],
      detalle: this.formBuilder.array([]),
    })
  }
  createFormDetalle():FormGroup{
    return this.formBuilder.group({
      producto_id:['',[Validators.required]],
      cantidad:['',[Validators.required, Validators.pattern('[0-9]*')]],
      precio_compra:['',[Validators.required]],
      total:['',[Validators.required]],
      codigo:[''],
      marca:[''],
      resumen:[''],
    })

  }



  listProductos(item){
    console.log('Item',item);

    this.productoService.getProductosProveedor(item).subscribe(
      res => {
          this.productos= res;
          console.log('productos',this.productos);
            // this.sumarUno();
      },
      error =>{
        console.log('Error' + error.error);
        this.loadingScroll = false;
      }
    )
    return true;
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
    this.sumarTotalTotal()
  }

  restarTodo(){
    while (this.control.length !== 0) {
        (<FormArray>this.form.controls['detalle']).removeAt(0)
    }
  }

  onCantidad(item:any,index:any){
    this.control.controls[index]
    .get('total')
    .setValue(

        Number(this.control.controls[index].get('precio_compra').value)*
        Number(this.control.controls[index].get('cantidad').value)

    )
    this.sumarTotalTotal();
  }

  onPrecio(item:any,index:any){
      console.log(item);
  }

  sumarTotalTotal() {
    let totalAuxBs = 0;
    let totalAux$US = 0;
    for (let i = 0; i < this.control.length; i++) {
      if(this.form.get('dolar').value==0){
        totalAuxBs += Number(this.control.controls[i].get('total').value);
         console.log(totalAuxBs);
      }
      else{
        totalAux$US += Number(this.control.controls[i].get('total').value);
         console.log(totalAuxBs);
      }
    }
    this.totalDolar = totalAux$US+(totalAuxBs/this.monedas);
    this.total = totalAuxBs+(totalAux$US*this.monedas);
    this.form.get('total').setValue(this.total.toFixed(2));
    this.form.get('total$US').setValue(this.totalDolar.toFixed(2))

  }

  OnProducto(item){
    this.listProductos(item.proveedor_id);
    this.restarTodo();
    // <FormArray>this.form.controls['detalle']=[];

  }

  onProductoArray(item,index){
    this.control.controls[index].get('codigo').setValue(item.codigo_texto);
    this.control.controls[index].get('marca').setValue(item.marca.nombre);
    this.control.controls[index].get('resumen').setValue(item.resumen_pro);
  }

  register(form:any){
    this.isLoading=true;
    this.submitted=true;

      if(this.ingreso_id){
        this.pedidosService.update(this.ingreso_id,this.form.value)
        .pipe(
          finalize(()=>{
            this.form.markAsPristine();
            this.isLoading = false;
          })
        )
        .subscribe(
          (data2:any)=>{
            this.toastr.success(data2.success,'Pedido Editado Exitosamente');
            this.router.navigate(['/dashboard/pedidos/list-pedidos']);
          },
          (error: any) => {
            this.toastr.error(error.error, 'Error');
          }
        )
      }
      else{
        this.pedidosService.create(form)
      .pipe(
        finalize(() => {

          this.form.markAsPristine();
          this.isLoading=false;
        })
      )
      .subscribe(
        data => {
          this.toastr.success(data.success, 'Pedido Registrado Exitosamente');
          this.router.navigate(['/dashboard/pedidos/list-pedidos']);

        },
        (error: any) => {
          this.toastr.error(error.error, 'Error');
        }
      );
      }
  }

}
