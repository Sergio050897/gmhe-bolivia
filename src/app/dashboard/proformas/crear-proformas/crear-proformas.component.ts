import { DatePipe, DecimalPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { finalize } from 'rxjs/operators';
import { TokenStorageService } from 'src/app/core/authentication/token-storage.service';
import { ClienteService } from 'src/app/core/service/cliente.service';
import { MonedaService } from 'src/app/core/service/moneda.service';
import { ProductoService } from 'src/app/core/service/producto.service';
import { ProformaService } from 'src/app/core/service/proforma.service';
import { SucursalService } from 'src/app/core/service/sucursal.service';
import { environment } from 'src/environments/environment.prod';
import { VerPdfComponent } from '../ver-pdf/ver-pdf.component';

@Component({
  selector: 'app-crear-proformas',
  templateUrl: './crear-proformas.component.html',
  styleUrls: ['./crear-proformas.component.scss']
})
export class CrearProformasComponent implements OnInit {

  proforma_id:any
  form: FormGroup;
  submitted=false;
  isLoading=false;
  clientes: any;
  productos: any[];
  control: any;
  array=[{
    "valor": 1,
    "tipo_moneda":"$US"
  },{
    "valor": 0,
    "tipo_moneda":"BS"
  }];
  tipo=[{
    "valor": 1,
    "tipo":"Credito"
  },{
    "valor": 0,
    "tipo":"Contado"
  }];
  monedas: any;
  totalDolar: number=0;
  itemsP: any;
  controlPagos: any;
  id: any;
  Sucursales: any;
  user: any;
  get detalle(): FormArray {
    return this.form.get('detalle') as FormArray;
  }
  get pagos(): FormArray {
    return this.form.get('pagos') as FormArray;
  }
  items:any;

  loadingScroll: boolean;
  total:number=0;
  totales:any
  url=environment.imgUrl;
  pagosTotal = [];
  factura: number = 0.13;
  modalOptions: NgbModalOptions = {
    size: 'lg'
  };
  isLoadingPdf = false;
  constructor(
    private formBuilder: FormBuilder,
    private clienteService: ClienteService,
    private proformaService: ProformaService,
    private toastr: ToastrService,
    private productoService: ProductoService,
    public route: ActivatedRoute,
    public router: Router,
    private monedaService: MonedaService,
    private datePipe: DatePipe,
    private modalService: NgbModal,
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
    this.moneda();
    this.listarSucursales();
    // this.sumarTotalTotal()
    this.control = <FormArray>this.form.controls['detalle'];
    this.controlPagos = <FormArray>this.form.controls['pagos'];
    this.user = this.tokenStorageService.getUser();

    if(this.proforma_id){
      this.proformaService.getById(this.proforma_id).subscribe(data=>{
        this.form.patchValue({
          nit: data.nit,
          cliente_id: data.cliente_id,
          telefono: data.cliente.celular,
          direccion: data.cliente.direccion,
          razon_social: data.razon_social,
          factura: data.factura,
          dolar: data.dolar,
          total: data.total.toFixed(2),
          total$US: (data.total).toFixed(2),
          tipo: data.tipo,
          interes: data.interes,
          sucursal_id:data.sucursal_id,
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
            codigo: element.producto.codigo_texto,
            marca: element.producto.marca.nombre,
            serie: element.producto.serie.nombre,
            resumen: element.producto.resumen_pro,
          })
        })
        data.pagos.forEach((element1,index) => {
          this.sumarUnoPago()
          this.controlPagos.controls[index].patchValue({
            fecha: this.datePipe.transform(element1.fecha,'yyyy-MM-dd'),
            valor: element1.valor,
          })
        });
        this.sumarTotalTotal();
      });

    }
    else{
      this.sumarUno();
      this.sumarUnoPago();
    }

  }

  getProforma(form) {
    return form.controls.proforma;
  }

  createForm(){
    this.form=this.formBuilder.group({
      nit:['',[Validators.required]],
      cliente_id:['',],
      razon_social:['',[Validators.required]],
      total:['',[Validators.required]],
      total$US: ['',[Validators.required]],
      telefono: ['',[Validators.required]],
      direccion: ['',[Validators.required]],
      dolar: ['',[Validators.required]],
      totalPagos: ['',[]],
      sucursal_id:['',[]],
      detalle: this.formBuilder.array([]),
      pagos: this.formBuilder.array([]),
    })
  }

  listCliente(){
    this.clienteService.getEnabledList().subscribe(
      data => {
          this.clientes= data;
          console.log(this.clientes);
      },
      error =>{
        console.log('Error' + error.error);
        this.loadingScroll = false;
      }
    )
  }
  listarSucursales(){
    // console.log("Cargos");
    this.sucursalService.getSucursal().subscribe(
      data => {
        this.Sucursales= data;
      },
      error=> {
        console.log('Error'+error.error);
      }
    )
  }
  createFormDetalle():FormGroup{
    return this.formBuilder.group({
      producto_id:['',[Validators.required]],
      cantidad:['',[Validators.required, Validators.pattern('[0-9]*')]],
      stock:['',[]],
      precio:['',[Validators.required]],
      total:['',[Validators.required]],
      concentracion:['']
    })

  }

  createFormPagos():FormGroup{
    return this.formBuilder.group({
      fecha:[this.datePipe.transform(Date.now(),'yyyy-MM-dd'),[Validators.required]],
      valor:['',[Validators.required]]
    });
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

  onClienteSelect(item:any){
      this.form.get('razon_social').setValue(item.razon_social)
      this.form.get('nit').setValue(item.nit)
      this.form.get('telefono').setValue(item.celular)
      this.form.get('direccion').setValue(item.direccion)
  }

  register(form:any){
    this.isLoading=true;
    this.submitted=true;

      if(this.proforma_id){
        this.proformaService.update(this.proforma_id,this.form.value)
        .pipe(
          finalize(()=>{
            this.form.markAsPristine();
            this.isLoading = false;
          })
        )
        .subscribe(
          (data2:any)=>{
            this.toastr.success(data2.success,'Dato Actualizado Exitosamente');
            // this.router.navigate(['/dashboard/proformas/list-proformas']);
          },
          (error: any) => {
            this.toastr.error(error.error, 'Error');
          }
        )
      }
      else{
        this.proformaService.create(form)
      .pipe(
        finalize(() => {

          this.form.markAsPristine();
          this.isLoading=false;
        })
      )
      .subscribe(
        data => {
          this.toastr.success(data.success, 'Dato Registrado Exitosamente');
          this.openPdf(data.id);
          this.form.reset();
          // this.router.navigate(['/dashboard/proformas/list-proformas']);
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

  sumarUnoPago(){
    this.controlPagos.push(this.createFormPagos())
    this.planPagos();
  }

  restarUnoPago(item: any){
    for (let i = 0; i < this.controlPagos.controls.length; i++) {
      if (item === i) {
        (<FormArray>this.form.controls['pagos']).removeAt(i);
      }
    }
    this.sumarTotalPagos();
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



  onMoneda(item:any){
    let dataBOB = '';
    let dataUS = '';

    for(let i = 0 ; i < this.control.length ; i++){
      if(this.form.get('dolar').value==0){
        dataBOB= Number((this.control.controls[i].get('precio').value)*this.monedas).toFixed(0)
        this.control.controls[i].get('precio').setValue(dataBOB);
        this.onCantidad('',i);
      }
      else{
        dataUS= Number((this.control.controls[i].get('precio').value)/this.monedas).toFixed(2)
        this.control.controls[i].get('precio').setValue(dataUS);
        this.onCantidad('',i);
      }
    }

  }

  onCantidad(item:any,index:any){
    if(this.control.controls[index].get('cantidad').value>this.itemsP.stock){
        this.toastr.warning('El producto seleccionado no tiene suficiente stock');
    }
    this.control.controls[index].get('total').setValue(
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

    this.totalDolar = totalAux$US+((totalAuxBs/this.monedas));
    this.total = totalAuxBs+((totalAux$US*this.monedas));
      this.form.get('total').setValue((this.total).toFixed(2));
      this.form.get('total$US').setValue((this.totalDolar).toFixed(2))
  }

  onFactura(){
    let interes = this.form.get('interes').value/100;
    let intereses=this.total*interes
    let facturas=0
    let intereses$=this.totalDolar*interes
    let facturas$=0

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

    // if(this.form.get('totalPagos').value!= this.form.get('total').value &&
    //   this.form.get('totalPagos').value!= this.form.get('total$US').value){
    //     this.toastr.warning('El total del plan de pago no coincide con el total del los productos seleccinados');
    // }
  }

  openPdf(id:any){

    this.isLoadingPdf = true;
     this.proformaService.getPdf(id).subscribe((res: any) => {
       this.isLoadingPdf = false;
       const file = new Blob([res], { type: 'application/pdf' });
       const fileURL = URL.createObjectURL(file);

       const modal = this.modalService.open(VerPdfComponent, this.modalOptions);
       // modal.componentInstance.Id = id;
       modal.componentInstance.estado = true;
       modal.componentInstance.title = 'Vista previa del Reporte';
       modal.componentInstance.pdfRuta = fileURL;
       modal.result.then(result => {
         if (result) {
          this.router.navigate(['/dashboard/proformas/list-proformas']);
        }
       });
     });
  }

}
