import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthenticationGuard } from '../core/authentication/authentication.guard';
import { AnalyticsComponent } from './analytics/analytics.component';
import { ECommerceComponent } from './e-commerce/e-commerce.component';


const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'e-commerce',
        component: ECommerceComponent,
        canActivate: [AuthenticationGuard],
        data: {
          title: 'e-Commerce'
        }
      },
      {
        path: 'analytics',
        component: AnalyticsComponent,
        canActivate: [AuthenticationGuard],
        data: {
          title: 'Analytics'
        }
      },
      
     
    ]
  },
  { path: 'usuario', loadChildren: () => import('./usuario/usuario.module').then(m => m.UsuarioModule) },
  { path: 'proformas', loadChildren: () => import('./proformas/proformas.module').then(m => m.ProformasModule) },
  { path: 'pedidos', loadChildren: () => import('./pedidos/pedidos.module').then(m => m.PedidosModule) },
  { path: 'categoria', loadChildren: () => import('./categoria/categoria.module').then(m => m.CategoriaModule) },
  { path: 'productos', loadChildren: () => import('./productos/productos.module').then(m => m.ProductosModule) },
  { path: 'marcas', loadChildren: () => import('./marcas/marcas.module').then(m => m.MarcasModule) },
  { path: 'series', loadChildren: () => import('./series/series.module').then(m => m.SeriesModule) },
  { path: 'sucursales', loadChildren: () => import('./sucursales/sucursales.module').then(m => m.SucursalesModule) },
  { path: 'almacen', loadChildren: () => import('./almacen/almacen.module').then(m => m.AlmacenModule) },
  { path: 'reportes', loadChildren: () => import('./reporte/reporte.module').then(m => m.ReporteModule) },
  { path: 'envios', loadChildren: () => import('./envios/envios.module').then(m => m.EnviosModule) },
  { path: 'clientes', loadChildren: () => import('./clientes/clientes.module').then(m => m.ClientesModule) },
  { path: 'proveedores', loadChildren: () => import('./proveedores/proveedores.module').then(m => m.ProveedoresModule) },
  { path: 'ventas', loadChildren: () => import('./ventas/ventas.module').then(m => m.VentasModule) },
  { path: 'configuraciones', loadChildren: () => import('./configuraciones/configuraciones.module').then(m => m.ConfiguracionesModule) },
  { path: 'sueldos', loadChildren: () => import('./sueldos/sueldos.module').then(m => m.SueldosModule) },
  { path: 'plan-pagos', loadChildren: () => import('./plan-pagos/plan-pagos.module').then(m => m.PlanPagosModule) },
  { path: 'unidades', loadChildren: () => import('./unidades/unidades.module').then(m => m.UnidadesModule) },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
