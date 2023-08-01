import { Component, OnInit } from '@angular/core';
import { ReporteService } from 'src/app/core/service/reporte.service';
import Swal from 'sweetalert2';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ViewPdfComponent } from 'src/app/components/view-pdf/view-pdf.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-ingresos',
  templateUrl: './ingresos.component.html',
  styleUrls: ['./ingresos.component.scss']
})
export class IngresosComponent implements OnInit {
  ingresos:any;
  form: FormGroup;
  datos:any;
  // fechaInicio:string;
  // fechaFinal:string;
  // term:string;
  constructor(
    private reporteService:ReporteService,
    private formBuilder: FormBuilder,
    private modalService: NgbModal,
  ) {
      // this.term= '';
      // this.fechaInicio=' ';
      // this.fechaFinal=' ';
  }

  ngOnInit(): void {
    this.fechas();
    this.listarAlmacen('','','');
    this.form.valueChanges
    .subscribe(data => {
      this.listarAlmacen(data.term,data.fecha_inicio,data.fecha_fin);
      this.datos = data;
      console.log('datos',this.datos);
    })

  }

  fechas() {
    this.form = this.formBuilder.group({
      term: ['',],
      fecha_inicio: ['',],
      fecha_fin: ['', ]
    });
  }

  listarAlmacen(term,fecha_inicio, fecha_fin){
    this.reporteService.searchIngresos(term,fecha_inicio,fecha_fin).subscribe(data =>{
      this.ingresos = data.data
      console.log(this.ingresos);
    },
    error =>{
      console.log(error.error);
    })
  }
  pdfAll(){
    this.reporteService.ingresosPDF(this.datos.term,this.datos.fecha_inicio,this.datos.fecha_fin).subscribe((res: any) => {
      const file = new Blob([res], { type: 'application/pdf' });
      const fileURL = URL.createObjectURL(file);

      const modal = this.modalService.open(ViewPdfComponent, {size:'lg'});
      // modal.componentInstance.Id = id;
      modal.componentInstance.estado = true;
      modal.componentInstance.title = 'Vista previa del Reporte';
      modal.componentInstance.pdfRuta = fileURL;
      modal.result.then((result) => {
        if (result) {
          // this.listStocks('','');
        }
      });
    });
  }
}
