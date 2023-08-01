import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { data } from 'jquery';
import { ToastrService } from 'ngx-toastr';
import { debounceTime } from 'rxjs/operators';
import { MonedaService } from 'src/app/core/service/moneda.service';
import { ProformaService } from 'src/app/core/service/proforma.service';
import { VentaService } from 'src/app/core/service/venta.service';
import Swal from 'sweetalert2';
import { VerPdfComponent } from '../ver-pdf/ver-pdf.component';

@Component({
  selector: 'app-list-proformas',
  templateUrl: './list-proformas.component.html',
  styleUrls: ['./list-proformas.component.scss']
})
export class ListProformasComponent implements OnInit {

  proformas:any;
  loadingScroll: boolean;
  isLoadingPdf = false;
  modalOptions: NgbModalOptions = {
    size: 'lg'
  };
  moneda: any;
  Buscador=new FormControl('', []);
  Numero = new FormControl('', []);
  
  constructor(
    private proformaService: ProformaService,
    private modalService: NgbModal,
    private ventaService: VentaService,
    private toastr: ToastrService,
    private monedaService: MonedaService,
  ) { }

  ngOnInit(): void {
    this.listProforma('','');
    this.listCambioMoneda();
    this.Buscador.valueChanges.pipe(
      debounceTime(300)
    )
    .subscribe(value => 
      this.listProforma(value,this.Numero.value));
   
    this.Numero.valueChanges.pipe(
       debounceTime(300)
    )
    .subscribe(value => 
        this.listProforma(this.Buscador.value,this.Numero.value));
  }

  listProforma(term,numero){
    this.proformaService.getAllProformas(term,numero).subscribe(
      data =>{
        this.proformas = data.data;
        console.log(this.proformas);
      },
      error =>{
        console.log('Error' + error.error);
        this.loadingScroll = false;
      }
      
    )
  }

  listCambioMoneda(){
    this.monedaService.getAll().subscribe(data=>{
      this.moneda = data;
      console.log(this.moneda)
    },
    error =>{
      console.log('Error' + error.error);
      this.loadingScroll = false;
    })
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
           this.listProforma('','');
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
        this.proformaService.delete(id)
        .subscribe(
          data=>{
            swalWithBootstrapButtons.fire(
              'Eliminado!',
              'Su archivo fue eliminado.',
              'success'
            )
            this.listProforma('','');
          },
          error =>{
            console.log('Error' + error.error);
            this.loadingScroll = false;
          }
        )
       
      } else if (
        /* Read more about handling dismissals below */
        result.dismiss === Swal.DismissReason.cancel
      ) {
        swalWithBootstrapButtons.fire(
          'Cancelled',
          'Your imaginary file is safe :)',
          'error'
        )
      }
    })
  }

  vender(id:any){
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
      confirmButtonText: 'Pasar a Venta',
      cancelButtonText: 'cancelar',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        this.ventaService.getProformaVenta(id)
        .subscribe(
          data=>{
            swalWithBootstrapButtons.fire(
              'La proforma paso a Venta exitosamente'
            )
            this.listProforma('','');
          },
          error =>{
            this.toastr.error(error.error, 'Error');
          }
        )
       
      } else if (
        /* Read more about handling dismissals below */
        result.dismiss === Swal.DismissReason.cancel
      ) {
        swalWithBootstrapButtons.fire(
          'Accion cancelada'
        )
      }
    })
  }


}
