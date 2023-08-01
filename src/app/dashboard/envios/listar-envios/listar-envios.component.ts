import { Component, OnInit } from '@angular/core';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { Subscriber } from 'rxjs';
import { EnvioService } from 'src/app/core/service/envio.service';
import Swal from 'sweetalert2';
import { VerPdfComponent } from '../../proformas/ver-pdf/ver-pdf.component';

@Component({
  selector: 'app-listar-envios',
  templateUrl: './listar-envios.component.html',
  styleUrls: ['./listar-envios.component.scss']
})
export class ListarEnviosComponent implements OnInit {
  envios: any;
  isLoadingPdf = false;
  modalOptions: NgbModalOptions = {
    size: 'lg'
  };
  
  constructor(
    private envioService: EnvioService,
    private modalService: NgbModal
  ) { }

  ngOnInit(): void {
    this.listEnvios();
  }

  listEnvios(){
      this.envioService.getAll().subscribe(data=>{
          this.envios = data.data;
          console.log(this.envios)
      })
  }

  openPdf(id:any){

    this.isLoadingPdf = true;
     this.envioService.getPdf(id).subscribe((res: any) => {
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
           this.listEnvios();
        }
       });
     });
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
        this.envioService.delete(id)
        .subscribe(
          data=>{
            swalWithBootstrapButtons.fire(
              'Eliminado!',
              'Su archivo fue eliminado.',
              'success'
            )
            this.listEnvios();
          }
        )
       
      } else if (
        /* Read more about handling dismissals below */
        result.dismiss === Swal.DismissReason.cancel
      ) {
        swalWithBootstrapButtons.fire(
          'Cancelled',
          'Tu archivo esta a salvo :)',
          'error'
        )
      }
    })
  }

}
