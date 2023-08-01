import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReporteRoutingModule } from './reporte-routing.module';
import { StockComponent } from './stock/stock.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { ProformaReporteComponent } from './proforma-reporte/proforma-reporte.component'; 
import { DeudoresComponent } from './deudores/deudores.component';
import { ListaVentasComponent } from './deudores/lista-ventas/lista-ventas.component';
import { VentasProductosComponent } from './ventas-productos/ventas-productos.component';
import { VentasPorVendedorComponent } from './ventas-por-vendedor/ventas-por-vendedor.component';
import { IngresosComponent } from './ingresos/ingresos.component';

@NgModule({
  declarations: [
    StockComponent,
    ProformaReporteComponent,
    DeudoresComponent,
    ListaVentasComponent,
    VentasProductosComponent,
    VentasPorVendedorComponent,
    IngresosComponent
  ],
  imports: [
    CommonModule,
    ReporteRoutingModule,
    FormsModule,
    NgSelectModule,
    ReactiveFormsModule,
  ]
})
export class ReporteModule { }
