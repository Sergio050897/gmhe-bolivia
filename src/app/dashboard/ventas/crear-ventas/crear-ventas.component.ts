import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { finalize } from 'rxjs/operators';
import { TokenStorageService } from 'src/app/core/authentication/token-storage.service';
import { ClienteService } from 'src/app/core/service/cliente.service';
import { MonedaService } from 'src/app/core/service/moneda.service';
import { ProductoService } from 'src/app/core/service/producto.service';
import { SucursalService } from 'src/app/core/service/sucursal.service';
import { VentaService } from 'src/app/core/service/venta.service';

@Component({
  selector: 'app-crear-ventas',
  templateUrl: './crear-ventas.component.html',
  styleUrls: ['./crear-ventas.component.scss']
})
export class CrearVentasComponent implements OnInit {

  proforma_id:any
  form: FormGroup;
  submitted=false;
  isLoading=false;
  clientes: any;
  productos: any[];
  control: any;
  controlPagos: any;
  array=[{
    "valor": 1,
    "tipo_moneda":"$US"
  },{
    "valor": 0,
    "tipo_moneda":"BS"
  }];
  optionsTipo=[{"value": 1,"lavel":"Credito"},{"value": 0,"lavel":"Contado"}];
  monedas: any;
  totalDolar: number;
  itemsP: any;
  Sucursales: any;
  user: any;
  factura: number = 0.13;
  get detalle(): FormArray {
    return this.form.get('detalle') as FormArray;
  }

  get pagos(): FormArray {
    return this.form.get('pagos') as FormArray;
  }

  items:any;

  loadingScroll: boolean;
  seleccionado:string[]=[];
  total:any
  totales:any

  constructor(
    private formBuilder: FormBuilder,
    private clienteService: ClienteService,
    private ventaService: VentaService,
    private toastr: ToastrService,
    private productoService: ProductoService,
    public route: ActivatedRoute,
    private monedaService: MonedaService,
    private router: Router,
    private datePipe: DatePipe,
    private sucursalService: SucursalService,
    private tokenStorageService: TokenStorageService,
  ) {

  }

  ngOnInit(): void {

    this.route.paramMap
      .subscribe((paramMap: any) => {
        this.proforma_id = paramMap.get('id');
      }
    );

    this.createForm();
    this.listCliente();
    this.listarSucursales();
    this.moneda();
    // this.sumarTotalTotal()
    this.user = this.tokenStorageService.getUser();

    this.control = <FormArray>this.form.controls['detalle'];
    this.controlPagos = <FormArray>this.form.controls['pagos'];

    if(this.proforma_id){
      this.ventaService.getById(this.proforma_id).subscribe(data=>{
        this.form.patchValue({
          nit: data.nit,
          sucursal_id: data.sucursal_id,
          celular: data.cliente.celular,
          direccion: data.cliente.direccion,
          cliente_id: data.cliente_id,
          razon_social: data.razon_social,
          // factura: data.factura,
          total: data.total.toFixed(2),
          total$US: (data.total/this.monedas).toFixed(2),
          totalPagos: data.totalPagos,
          dolar: data.dolar
        })
        this.listProductos(data.sucursal_id);
        data.detalle.forEach((element,index) => {
          this.sumarUno();
          this.control.controls[index].patchValue({
            producto_id : element.producto_id,
            cantidad: element.cantidad,
            precio: element.precio,
            total: element.total,
            stock: element.producto.stock,
            categoria: element.producto.categoria.nombre,
            concentracion: element.concentracion,
          })
        });
        data.pagos.forEach((element,index) => {
          this.sumarUnPago();
          this.controlPagos.controls[index].patchValue({
            fecha : element.fecha,
            valor: element.valor,
            cancelado: element.cancelado,
          })
        });
        this.sumarTotalTotal();
      });

    }else{
        this.sumarUno();
        this.sumarUnPago();
    }
  }

  getProforma(form) {
    return form.controls.proforma;
  }

  createForm(){
    this.form=this.formBuilder.group({
      sucursal_id:['',[Validators.required]],
      nit:['',[Validators.required]],
      cliente_id:['',[Validators.required]],
      razon_social:['',[Validators.required]],
      total:['',[Validators.required]],
      celular:['',[Validators.required]],
      dolar:['',[Validators.required]],
      direccion:['',[Validators.required]],
      // factura:[false],
      detalle: this.formBuilder.array([]),
      pagos: this.formBuilder.array([]),
      total$US: ['',[Validators.required]],
      // interes: ['',[]],
      totalPagos: ['',[]],
    })
  }

  createFormDetalle():FormGroup{
    return this.formBuilder.group({
      producto_id:['',[Validators.required]],
      cantidad:['',[Validators.required]],
      precio:['',[Validators.required]],
      stock:['',[Validators.required]],
      concentracion:[''],
      total:['',[Validators.required]],
    })
  }

  createFormPagos():FormGroup{
    return this.formBuilder.group({
      fecha:[this.datePipe.transform(Date.now(),'yyyy-MM-dd'),[]],
      valor:['',[]],
      totalPagos:['',[]],
      cancelado:[''],
    })
  }

  listCliente(){
    this.clienteService.getEnabledList().subscribe(
      data => {
          this.clientes= data;
      },
      error =>{
        console.log('Error' + error.error);
        this.loadingScroll = false;
      }
    )
  }
  moneda(){
    this.monedaService.getAll().subscribe(data => {
      this.monedas = data.cambio_moneda;
    })
  }
  listProductos(id){
    if(this.tokenStorageService.getUser().roles[0].id==4){
      this.productoService.getProductosStockVendedor().subscribe(
        res=>{
          this.productos= res;
        }
      )
    }

    else{
      if(this.tokenStorageService.getUser().roles[0].id==1){
        this.productoService.getProductosStock(id).subscribe(
          data=> {
            this.productos = data;
          }
        )
      }
    }

  }

  OnSucursal(item){
    this.listProductos(item.sucursal_id);
  }
  listarSucursales(){
    this.sucursalService.getSucursal().subscribe(
      data => {
        this.Sucursales= data;
      },
      error=> {
        console.log('Error'+error.error);
      }
    )
  }

  onClienteSelect(item:any){
      this.form.get('razon_social').setValue(item.razon_social)
      this.form.get('nit').setValue(item.nit)
      this.form.get('celular').setValue(item.celular)
      this.form.get('direccion').setValue(item.direccion)
  }

  register(form:any){
    this.isLoading=true;
    this.submitted=true;

      if(this.proforma_id){
        this.ventaService.update(this.proforma_id,this.form.value)
        .pipe(
          finalize(()=>{
            this.form.markAsPristine();
            this.isLoading = false;
          })
        )
        .subscribe(
          (data2:any)=>{
            this.toastr.success(data2.success,'Dato Actualizado Exitosamente');
            this.router.navigate(['/dashboard/ventas/ventas']);
          },
          (error: any) => {
            this.toastr.error(error.error, 'Error');
          }
        )
      }
      else{
        this.ventaService.create(form)
      .pipe(
        finalize(() => {

          this.form.markAsPristine();
          this.isLoading=false;
        })
      )
      .subscribe(
        data => {
          this.toastr.success(data.success, 'Dato Registrado Exitosamente');
          this.router.navigate(['/dashboard/ventas/ventas']);
        },
        (error: any) => {
          this.toastr.error(error.error, 'Error');
        }
      );
      }
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
    this.sumarTotalTotal()
  }

  sumarUnPago(){
    this.controlPagos.push(this.createFormPagos());
    this.planPagos();
  }

  restarUnPago(item: any) {
    for (let i = 0; i < this.controlPagos.controls.length; i++) {
      if (item === i) {
        (<FormArray>this.form.controls['pagos']).removeAt(i);
      }
    }
    this.sumarTotalPagos()
    this.planPagos();
  }

  onProductoSelect(item:any,index:any){
    this.itemsP= item

    if(this.form.get('dolar').value==0){
        this.control.controls[index].get('precio').setValue((this.itemsP.p_menor).toFixed(2))
    }
    else{
        this.control.controls[index].get('precio').setValue((this.itemsP.p_menor/this.monedas).toFixed(2))

    }
    this.control.controls[index].get('stock').setValue(item.stock);
    this.control.controls[index].get('concentracion').setValue(this.itemsP.concentracion);

  }

  onFactura(){
    let interes = this.form.get('interes').value/100;
    let intereses=this.total*interes
    let intereses$=this.totalDolar*interes

    if (this.form.get('factura').value) {
      this.form.get('total').setValue((this.total*this.factura+this.total).toFixed(2));
      this.form.get('total$US').setValue((this.totalDolar*this.factura+this.totalDolar).toFixed(2))

    } else {
      this.form.get('total').setValue(this.total.toFixed(2));
      this.form.get('total$US').setValue(this.totalDolar.toFixed(2))
    }

    if (this.form.get('factura').value && this.form.get('tipo').value==1 ) {

      this.form.get('total').setValue((this.total*this.factura+this.total+intereses).toFixed(2));
      this.form.get('total$US').setValue((this.totalDolar*this.factura+this.totalDolar+intereses$).toFixed(2))

    } else {
      this.form.get('total').setValue(this.total.toFixed(2));
      this.form.get('total$US').setValue(this.totalDolar.toFixed(2))
    }
  }

  onMoneda(item:any){
    let dataBOB;
    for(let i = 0 ; i < this.control.length ; i++){
      if(this.form.get('dolar').value==0){
        dataBOB= Number((this.control.controls[i].get('precio').value)*this.monedas).toFixed(0)
        this.control.controls[i].get('precio').setValue(dataBOB);
        this.onCantidad('',i);
      }
      else{
        dataBOB= Number((this.control.controls[i].get('precio').value)/this.monedas).toFixed(2)
        this.control.controls[i].get('precio').setValue(dataBOB);
        this.onCantidad('',i);
      }

    }
  }

  onCantidad(item:any,index:any){
    if(this.control.controls[index].get('cantidad').value>this.itemsP.stock){
      this.toastr.warning('El producto seleccionado no tiene suficiente stock');
    }
    this.control.controls[index]
    .get('total')
    .setValue(
      Number(this.control.controls[index].get('precio').value)*
      Number(this.control.controls[index].get('cantidad').value)
    )
    this.sumarTotalTotal();
  }

  sumarTotalTotal() {
    let totalAuxBs = 0;
    let totalAux$US = 0;
    for (let i = 0; i < this.control.length; i++) {
      if(this.form.get('dolar').value==0){
        totalAuxBs += Number(this.control.controls[i].get('total').value);
      }
      else{
        totalAux$US += Number(this.control.controls[i].get('total').value);
      }
    }
    this.totalDolar = totalAux$US+(totalAuxBs/this.monedas);
    this.total = totalAuxBs+(totalAux$US*this.monedas);
      this.form.get('total').setValue((this.total).toFixed(2));
      this.form.get('total$US').setValue((this.totalDolar).toFixed(2))
  }

  planPagos(){
    let count =0
    for(let i =0; i< this.controlPagos.length; i++){
      if(this.form.get('dolar').value==0)
        this.controlPagos.controls[i].get('valor').setValue(Number(this.form.get('total').value/this.controlPagos.length).toFixed(2));
      else
        this.controlPagos.controls[i].get('valor').setValue(Number(this.form.get('total$US').value/this.controlPagos.length).toFixed(2));
      this.sumarTotalPagos();
    }
  }

  sumarTotalPagos() {
    let totalAux = 0;
    for (let i = 0; i < this.controlPagos.length; i++) {
      totalAux += Number(this.controlPagos.controls[i].get('valor').value);
    }
    this.form.get('totalPagos').setValue(totalAux.toFixed(2))
  }
}
