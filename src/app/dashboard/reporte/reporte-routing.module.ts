import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthenticationGuard } from 'src/app/core/authentication/authentication.guard';
import { DeudoresComponent } from './deudores/deudores.component';
import { ListaVentasComponent } from './deudores/lista-ventas/lista-ventas.component';
import { ProformaReporteComponent } from './proforma-reporte/proforma-reporte.component';
import { StockComponent } from './stock/stock.component';
import { VentasProductosComponent } from './ventas-productos/ventas-productos.component';
import { VentasPorVendedorComponent } from './ventas-por-vendedor/ventas-por-vendedor.component';
import { IngresosComponent } from './ingresos/ingresos.component';

const routes: Routes = [
  {
    path: 'stock',
    canActivate: [AuthenticationGuard],
    component: StockComponent
  },
  {
    path: 'proforma',
    canActivate: [AuthenticationGuard],
    component: ProformaReporteComponent
  },
  {
    path: 'clientes',
    canActivate: [AuthenticationGuard],
    component: DeudoresComponent
  },
  {
    path: 'cliente/:id/ventas',
    canActivate: [AuthenticationGuard],
    component: ListaVentasComponent
  },
  {
    path: 'ventas/productos',
    canActivate: [AuthenticationGuard],
    component: VentasProductosComponent
  },
  {
    path: 'ventas/vendedor',
    canActivate: [AuthenticationGuard],
    component: VentasPorVendedorComponent
  },
  {
    path: 'reportes/ingresos',
    canActivate: [AuthenticationGuard],
    component: IngresosComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReporteRoutingModule { }
