import { Component, OnInit } from '@angular/core';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { VentaService } from 'src/app/core/service/venta.service';
import { VerPdfComponent } from '../../proformas/ver-pdf/ver-pdf.component';

@Component({
  selector: 'app-listar-ventas',
  templateUrl: './listar-ventas.component.html',
  styleUrls: ['./listar-ventas.component.scss']
})
export class ListarVentasComponent implements OnInit {

  ventas: any;
  isLoadingPdf = false;
  modalOptions: NgbModalOptions = {
    size: 'lg'
  };

  constructor(
    private ventaService: VentaService,
    private modalService: NgbModal,
  ) { }

  ngOnInit(): void {
    this.listarVentas();
  }
  listarVentas() {
    this.ventaService.getAll().subscribe(data=>{
        this.ventas = data.data;
        console.log(this.ventas);
    })
  }
  openPdf(id:any){

    this.isLoadingPdf = true;
     this.ventaService.getPdf(id).subscribe((res: any) => {
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
           this.listarVentas();
        }
       });
     });
  }

}
