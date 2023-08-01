import { Component, OnInit } from '@angular/core';
import { ViewPdfComponent } from 'src/app/components/view-pdf/view-pdf.component';
import { debounceTime } from 'rxjs/operators';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ReporteService } from 'src/app/core/service/reporte.service';
import { SucursalService } from 'src/app/core/service/sucursal.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-ventas-por-vendedor',
  templateUrl: './ventas-por-vendedor.component.html',
  styleUrls: ['./ventas-por-vendedor.component.scss']
})
export class VentasPorVendedorComponent implements OnInit {
  vendedores: any;
  Sucursales: any;
  form:FormGroup;
  item:any;
  term = new FormControl('', []);
  cantidad:any;
  rol:any;
  constructor(
    private reporteService: ReporteService,
    private sucursalService: SucursalService,
    private formBuilder: FormBuilder,
    private modalService: NgbModal,
    public route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.createForm();
    this.listarSucursales();
    this.listVendedor('');

    this.form.valueChanges.pipe(
      debounceTime(300)
    )
    .subscribe(value =>{
      this.listVendedor(value.term)
      this.cantidad = value.cantidad
    }
    )


  }
  onChange(item:any){
    this.item=item.sucursal_id;
    console.log(this.item)
    this.listVendedor('');
  }
  createForm(){
    this.form=this.formBuilder.group({
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

  // listStocks(cantidad,term){
  //   this.reporteService.getStock(this.item,cantidad,term).subscribe(data=>{
  //     this.stocks = data.data;
  //     console.log(this.stocks);
  //   })
  // }
  listVendedor(term){
    this.reporteService.getVendedor(term).subscribe(data=>{
      this.vendedores = data;
      console.log(this.vendedores);
    })
  }
  pdfAll(){
    this.reporteService.vendedoresPDF(this.form.controls.term.value).subscribe((res: any) => {
      const file = new Blob([res], { type: 'application/pdf' });
      const fileURL = URL.createObjectURL(file);

      const modal = this.modalService.open(ViewPdfComponent, {size:'lg'});
      // modal.componentInstance.Id = id;
      modal.componentInstance.estado = true;
      modal.componentInstance.title = 'Vista previa del Reporte';
      modal.componentInstance.pdfRuta = fileURL;
      modal.result.then((result) => {
        if (result) {
          this.listVendedor('');
        }
      });
    });
  }
}
