import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';
import { ReporteService } from 'src/app/core/service/reporte.service';
import { SucursalService } from 'src/app/core/service/sucursal.service';
import { ListaSucursalesComponent } from '../../sucursales/lista-sucursales/lista-sucursales.component';
import { ViewPdfComponent } from 'src/app/components/view-pdf/view-pdf.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-stock',
  templateUrl: './stock.component.html',
  styleUrls: ['./stock.component.scss']
})
export class StockComponent implements OnInit {
  stocks: any;
  Sucursales: any;
  form:FormGroup;
  item:any;
  term = new FormControl('', []);
  cantidad:any;
  rol:any;
  constructor(
    private stockService: ReporteService,
    private sucursalService: SucursalService,
    private formBuilder: FormBuilder,
    private modalService: NgbModal,
    public route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.createForm();
    this.listarSucursales();
    this.listStocks('','');

    this.form.valueChanges.pipe(
      debounceTime(300)
    )
    .subscribe(value =>{
      this.listStocks(value.cantidad,value.term)
      this.cantidad = value.cantidad
    }
    )


  }
  onChange(item:any){
    this.item=item.sucursal_id;
    console.log(this.item)
    this.listStocks(' ','');
  }
  createForm(){
    this.form=this.formBuilder.group({
      sucursal_id:['',[]],
      cantidad:['',[]],
      term:['',[]]
    })
  }

  listarSucursales(){
    // console.log("Cargos");
    this.sucursalService.getSucursal().subscribe(
      data => {
        this.Sucursales= data;
        console.log(this.Sucursales);
      },
      error=> {
        console.log('Error'+error.error);
      }
    )
  }

  listStocks(cantidad,term){
    this.stockService.getStock(this.item,cantidad,term).subscribe(data=>{
      this.stocks = data.data;
      console.log(this.stocks);
    })
  }
  pdfAll(){
    this.stockService.reportesPDF(this.form.controls.term.value,this.item,this.cantidad).subscribe((res: any) => {
      const file = new Blob([res], { type: 'application/pdf' });
      const fileURL = URL.createObjectURL(file);

      const modal = this.modalService.open(ViewPdfComponent, {size:'lg'});
      // modal.componentInstance.Id = id;
      modal.componentInstance.estado = true;
      modal.componentInstance.title = 'Vista previa del Reporte';
      modal.componentInstance.pdfRuta = fileURL;
      modal.result.then((result) => {
        if (result) {
          this.listStocks('','');
        }
      });
    });
  }

}
