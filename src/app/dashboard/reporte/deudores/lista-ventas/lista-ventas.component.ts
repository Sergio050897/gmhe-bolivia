import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { data } from 'jquery';
import { MonedaService } from 'src/app/core/service/moneda.service';
import { ReporteService } from 'src/app/core/service/reporte.service';

@Component({
  selector: 'app-lista-ventas',
  templateUrl: './lista-ventas.component.html',
  styleUrls: ['./lista-ventas.component.scss']
})
export class ListaVentasComponent implements OnInit {
  cliente_id: any;
  ventas: any;
  moneda: any;

  constructor(
    private reporteService: ReporteService,
    private route: ActivatedRoute,
    private monedaService: MonedaService,
  ) { }

  ngOnInit(): void {
    this.route.paramMap
      .subscribe((paramMap: any) => {        
        this.cliente_id = paramMap.get('id');
        console.log(this.cliente_id);
      }
    );
    this.listaVentas();
    this.listCambioMoneda();
  }

  listCambioMoneda(){
    this.monedaService.getAll().subscribe(data=>{
      this.moneda = data;
      console.log(this.moneda)
    },
    error =>{
      console.log('Error' + error.error);
    })
  }

  listaVentas() {
      this.reporteService.ventasDeudores(this.cliente_id)
      .subscribe(data=>{
          this.ventas = data;
          console.log(this.ventas);
      },error =>{
            console.log('Error' + error.error);
      })  
  }

}
