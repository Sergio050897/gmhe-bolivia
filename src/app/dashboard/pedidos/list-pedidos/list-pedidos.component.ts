import { Component, OnInit } from '@angular/core';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { PedidoService } from 'src/app/core/service/pedido.service';
import Swal from 'sweetalert2';
import { VerPdfComponent } from '../../proformas/ver-pdf/ver-pdf.component';
import { ModalIngresoComponent } from '../modal-ingreso/modal-ingreso.component';

@Component({
  selector: 'app-list-pedidos',
  templateUrl: './list-pedidos.component.html',
  styleUrls: ['./list-pedidos.component.scss']
})
export class ListPedidosComponent implements OnInit {
  ingresos:any;
  isLoadingPdf = false;
  modalOptions: NgbModalOptions = {
    size: 'lg'
  };

  constructor(
    private pedidosService: PedidoService,
    private modalService: NgbModal
  ) { }

  ngOnInit(): void {
    this.listarIngresos()
  }

  listarIngresos() {
    console.log("pedido");
    this.pedidosService.getAll().subscribe(data=>{
        this.ingresos = data.data;
        console.log(this.ingresos)
    },
    error=> {
      console.log('Error'+error.error);
    })
  }

  delete(id: any) {
    console.log(id);
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger',
      },
      buttonsStyling: false
    })
    swalWithBootstrapButtons.fire({
      title: '¿Está seguro?',
      text: "¡Esta acción no podrá revertirce!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si, bórralo!',
      cancelButtonText: 'No, cancelar!',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        this.pedidosService.delete(id)
        .subscribe(
          data=>{
            swalWithBootstrapButtons.fire(
              'Eliminado!',
              'Su archivo fue eliminado.',
              'success'
            )
            this.listarIngresos();
          },
          error=> {
            Swal.fire({
              icon: 'error',
              title: 'El Pedido',
              text: 'No puede ser eliminado porque ya fue ingresado'
            });
          }
        )

      } else if (
        /* Read more about handling dismissals below */
        result.dismiss === Swal.DismissReason.cancel
      ) {
        swalWithBootstrapButtons.fire(
          'Cancelled',
          'El registro esta a salvo :)',
          'error'
        )
      }
    })
  }

  ingresoAlmacen(id:any){
    console.log(id)
    const modalRef = this.modalService.open(
      ModalIngresoComponent,
      {
        size:'lg'
      }
    );
    modalRef.componentInstance.id = id;
    modalRef.componentInstance.title = 'Ingresos';
    modalRef.result.then((result) => {
      if(result){
          this.listarIngresos();
      }
    })
  }

  openPdf(id:any){

    this.isLoadingPdf = true;
     this.pedidosService.getPdf(id).subscribe((res: any) => {
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
           this.listarIngresos();
        }
       });
     });
  }
}
