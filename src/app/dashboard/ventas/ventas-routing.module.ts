import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthenticationGuard } from 'src/app/core/authentication/authentication.guard';
import { CrearVentasComponent } from './crear-ventas/crear-ventas.component';
import { ListarVentasComponent } from './listar-ventas/listar-ventas.component';

const routes: Routes = [
  {
    path: 'ventas',
    canActivate: [AuthenticationGuard],
    component: ListarVentasComponent
  },
  {
    path: 'crear',
    canActivate: [AuthenticationGuard],
    component: CrearVentasComponent
  },
  {
    path: 'crear/:id',
    canActivate: [AuthenticationGuard],
    component: CrearVentasComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VentasRoutingModule { }
