import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthenticationGuard } from 'src/app/core/authentication/authentication.guard';
import { CrearPedidosComponent } from './crear-pedidos/crear-pedidos.component';
import { ListPedidosComponent } from './list-pedidos/list-pedidos.component';

const routes: Routes = [
  {
    path: 'list-pedidos',
    canActivate: [AuthenticationGuard],
    component: ListPedidosComponent
  },
  {
    path: 'crear-pedidos',
    canActivate: [AuthenticationGuard],
    component: CrearPedidosComponent
  },
  {
    path: 'crear-pedidos/:id',
    canActivate: [AuthenticationGuard],
    component: CrearPedidosComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PedidosRoutingModule { }
