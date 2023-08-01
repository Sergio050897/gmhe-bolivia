import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ViewPdfComponent } from 'src/app/components/view-pdf/view-pdf.component';
import { ReporteService } from 'src/app/core/service/reporte.service';

@Component({
  selector: 'app-ventas-productos',
  templateUrl: './ventas-productos.component.html',
  styleUrls: ['./ventas-productos.component.scss']
})
export class VentasProductosComponent implements OnInit {
  productos: any;
  datos: any;
  form: FormGroup;
  array=[{
    "valor": " ",
    "fecha":"Todo"
  },{
    "valor": "day",
    "fecha":"Día"
  },
  {
    "valor": "month",
    "fecha":"Mes"
  },
  {
    "valor": "year",
    "fecha":"Año"
  },
  ];

  itemArray: any;
  years: any;

  constructor(
    private reporteService : ReporteService,
    private formBuilder: FormBuilder,
    private modalService: NgbModal,
  ) { }

  ngOnInit(): void {
    this.listarProductos(' ',' ',' ');
    this.fechas();
    this.listYears();
    this.form.valueChanges
    .subscribe(data => {
      this.listarProductos(data.term,data.filter,data.fecha);
      this.datos = data;
      console.log('datos',this.datos);
    })
  }

  fechas() {
    this.form = this.formBuilder.group({
      term:['',],
      filter: ['',],
      fecha: ['',]
    });
  }

  listYears() {
    this.reporteService.getYear().subscribe(data=>{
      this.years = data;
      console.log(this.years)
    })
  }
  onFecha(item:any){
    this.itemArray = item.valor;
    console.log(this.itemArray);
  }
  listarProductos(term,filter,fecha) {
    this.reporteService.ventaProductos(term,filter,fecha).subscribe(data=>{
        this.productos =  data;
        console.log(this.productos)
    })
  }
  pdfAll(){
    this.reporteService.ventasPDF(this.datos.term,this.datos.filter,this.datos.fecha).subscribe((res: any) => {
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
