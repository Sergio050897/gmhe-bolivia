import { Component, OnInit } from '@angular/core';
import { ReporteService } from 'src/app/core/service/reporte.service';

@Component({
  selector: 'app-deudores',
  templateUrl: './deudores.component.html',
  styleUrls: ['./deudores.component.scss']
})
export class DeudoresComponent implements OnInit {
  deudores: any;

  constructor(
    private reporteService: ReporteService
  ) { }

  ngOnInit(): void {
    this.listaDeudores();
  }
  listaDeudores() {
    this.reporteService.clientesDeudores().subscribe(data=>{
       this.deudores = data.data;
       console.log(this.deudores)
    })
  }



}
