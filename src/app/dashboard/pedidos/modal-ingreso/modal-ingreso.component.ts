import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { finalize } from 'rxjs/operators';
import { AlmacenService } from 'src/app/core/service/almacen.service';
import { PedidoService } from 'src/app/core/service/pedido.service';

@Component({
  selector: 'app-modal-ingreso',
  templateUrl: './modal-ingreso.component.html',
  styleUrls: ['./modal-ingreso.component.scss']
})
export class ModalIngresoComponent implements OnInit {
  modalOptions: NgbModalOptions = {};
  isLoading = false;
  @Input() title: string;
  @Input() id: string;
  form: FormGroup;
  detalle: any=[];
  detalles: any;
  control: any;

  get productos(): FormArray {
    return this.form.get('productos') as FormArray;
  }

  constructor(
    public activeModal: NgbActiveModal,
    private almacenService: AlmacenService,
    private pedidosService: PedidoService,
    private formBuilder: FormBuilder,
    private toastr:ToastrService
  ) { }

  ngOnInit(): void {
    this.listarPedidoId(this.id);
    this.createForm();
    this.control = <FormArray>this.form.controls['productos'];
  }

  createForm() {
    this.form = this.formBuilder.group({
      pedido_id: [this.id],
      productos: this.formBuilder.array([]),
    });

  }

  createFormDetalle():FormGroup{
    return this.formBuilder.group({
      producto_nombre:[''],
      cantidad:[''],
      precio_compra:[''],
      total:[''],
      ubicacion: ['', Validators.required],
      detalle_id: [],

    })

  }

  sumarUno(){
    this.control.push(this.createFormDetalle());
  }

  listarPedidoId(id){
    this.pedidosService.getById(id).subscribe(data =>{
      this.detalle = data;
      console.log(this.detalle);

      this.detalle.detalle.forEach((element,index)=>{
        this.sumarUno()
        this.control.controls[index].patchValue({
            producto_nombre: element.producto.nombre,
            cantidad: element.cantidad,
            precio_compra: element.precio_compra,
            detalle_id: element.id
        })

      })

    })
  }

  registrar(form:any){
    console.log(this.id)
    this.almacenService.postALmacenPedido(form)
    .subscribe(
      (data: any) => {
        // console.log('rol', this.rolSelected, this.currentSearchTerm);
        this.toastr.success(data.succes, 'Éxito');
        this.activeModal.close(data);
        // this.disableScroll = true;
      },
      error => {
        console.log('error ' + error);
        this.toastr.error(error.error, 'Error');
      }
    );
  }
}
