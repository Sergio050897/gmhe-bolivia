import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { finalize } from 'rxjs/operators';
import { PagoService } from 'src/app/core/service/pago.service';
import { VentaService } from 'src/app/core/service/venta.service';

@Component({
  selector: 'app-lista-plan-pagos',
  templateUrl: './lista-plan-pagos.component.html',
  styleUrls: ['./lista-plan-pagos.component.scss']
})
export class ListaPlanPagosComponent implements OnInit {

  form: FormGroup;
  submitted=false;
  isLoading=false;
  controlPagos: any;
  pagos1:any[];
  venta_id:any;

  get pagos(): FormArray {
    return this.form.get('pagos') as FormArray;
  }
  loadingScroll: boolean;

  constructor(
    private formBuilder: FormBuilder,
    private basicService: PagoService,
    private ventaService: VentaService,
    private toastr: ToastrService,
    public route: ActivatedRoute,
    private router: Router
  ) {      
      
  }

  ngOnInit(): void {
    this.route.paramMap
      .subscribe((paramMap: any) => {        
        this.venta_id = paramMap.get('id');
      }
    );
    this.createForm();
    this.listaPagos();

    this.controlPagos = <FormArray>this.form.controls['pagos'];   
  }
  createForm(){
    this.form=this.formBuilder.group({
      venta_id:[this.venta_id],
      pagos: this.formBuilder.array([]),   
      totalPagos: ['',[]], 
    })
  }
  register(form:any){
    this.isLoading=true;
    this.submitted=true;
    
    this.basicService.postPagoVenta(form)
      .pipe(    
        finalize(() => {
          this.form.markAsPristine();
          this.isLoading=false;
        })
      )
      .subscribe(
        data => {
          this.toastr.success(data.success, 'Éxito');
          this.router.navigate(['/dashboard/ventas/ventas']); 
        },
        (error: any) => {
          this.toastr.error(error.error, 'Error');
        }
      );
  }

  listaPagos(){
    this.basicService.getEnabledList().subscribe(
      data =>{
        this.pagos1 = data;
        console.log('pagos',this.pagos1);
        this.ventaService.getById(this.venta_id).subscribe(data=>{
          this.form.patchValue({
            totalPagos: data.totalPagos,
          });
          data.pagos.forEach((element,index) => {
            this.sumarUnPago();
            this.controlPagos.controls[index].patchValue({
              id : element.id,
              fecha: element.fecha,
              valor: element.valor,
              cancelado: element.cancelado
            })
          });
        })
        // this.sumarUnPago();
      },
      error => {
        console.log('Error' + error.error);
        this.loadingScroll = false;
      }
    )
  }
 
  createFormPago():FormGroup{
    return this.formBuilder.group({
      id:[''],
      fecha:[''],
      valor:[''],
      cancelado:[''],
    })
  }

  sumarUnPago(){
    this.controlPagos.push(this.createFormPago());
  }

  restarUnPago(item: any) {
    for (let i = 0; i < this.controlPagos.controls.length; i++) {
      if (item === i) {
        (<FormArray>this.form.controls['pagos']).removeAt(i);
      }
    }
    this.sumarTotalPagos()
  }

  sumarTotalPagos() {
    let totalAux = 0;
    for (let i = 0; i < this.controlPagos.length; i++) {
      totalAux += Number(this.controlPagos.controls[i].get('valor').value);     
    }
    this.form.get('totalPagos').setValue(totalAux.toFixed(2))
  }
}
