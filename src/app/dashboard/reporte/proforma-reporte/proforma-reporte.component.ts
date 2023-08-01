import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NgbDatepicker, NgbDateStruct, NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { debounceTime } from 'rxjs/operators';
import { ClienteService } from 'src/app/core/service/cliente.service';
import { ReporteService } from 'src/app/core/service/reporte.service';
import { UserService } from 'src/app/core/service/user.service';
import { VerPdfComponent } from '../../proformas/ver-pdf/ver-pdf.component';

@Component({
  selector: 'app-proforma-reporte',
  templateUrl: './proforma-reporte.component.html',
  styleUrls: ['./proforma-reporte.component.scss']
})
export class ProformaReporteComponent implements OnInit {
  proformas: any;
  form : FormGroup;
  date: NgbDateStruct;
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
  model; 
  clientes: any;
  vendedores: any;
  loadingScroll: boolean;
  isLoadingPdf = false;
  modalOptions: NgbModalOptions = {
    size: 'lg'
  };
  years: any;
  
  constructor(
    private reporteService: ReporteService,
    private formBuilder: FormBuilder, 
    private usuarioService: UserService,
    private clienteService: ClienteService,
    private modalService: NgbModal,
    private datePipe: DatePipe
    ) { 
 
  }

  ngOnInit(): void {
    this.listarProformaReporte(' ','','','','');
    this.listClientes();
    this.listVendedores();
    this.fechas();
    this.listYears();
    this.form.valueChanges
    .subscribe(data => {      
      this.listarProformaReporte(data.term,data.cliente_id,data.usuario_id,data.filter,data.fecha);
    })
  }
  listYears() {
    this.reporteService.getYear().subscribe(data=>{
      this.years = data;
      console.log(this.years)
    })
  }

  fechas() {
    this.form = this.formBuilder.group({
      filter: ['',],
      fecha: ['',],
      term: ['',],
      cliente_id:['',],
      usuario_id:['',]
    });
  }

  onFecha(item:any){
      this.itemArray = item.valor;
      console.log(this.itemArray);   
      // if(item.valor =='year'){
      //   this.form.get('fecha').setValue(this.datePipe.transform('yyyy' ))
      // }   
  }

  listarProformaReporte(term,cliente_id,usuario_id,filter,fechas,) {
    this.reporteService.getProforma(term,cliente_id,usuario_id,filter,fechas).subscribe(data=>{
       this.proformas = data.data;
       console.log(this.proformas);
    })
  }

  listClientes(){
    this.clienteService.getEnabledList().subscribe(data => {
       this.clientes = data;
       console.log(this.clientes);
    });
  }

  listVendedores(){
    this.usuarioService.getVendedores().subscribe(data => {
      this.vendedores = data;
      console.log(this.vendedores);
    })
  }

  openPdf(){
    this.isLoadingPdf = true;
        this.reporteService.getPdf(this.form.get('term').value,
            this.form.get('cliente_id').value,
            this.form.get('usuario_id').value,
            this.form.get('filter').value,
            this.form.get('fecha').value,    
        ).subscribe((res: any) => {
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
              this.listarProformaReporte(' ','','','','');
          }
          });
        });
  }
}
