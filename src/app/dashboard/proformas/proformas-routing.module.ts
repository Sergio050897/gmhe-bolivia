import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthenticationGuard } from 'src/app/core/authentication/authentication.guard';
import { CrearProformasComponent } from './crear-proformas/crear-proformas.component';
import { ListProformasComponent } from './list-proformas/list-proformas.component';

const routes: Routes = [
  {
    path: 'list-proformas',
    canActivate: [AuthenticationGuard],
    component: ListProformasComponent
  },
  {
    path: 'crear-proformas',
    canActivate: [AuthenticationGuard],
    component:CrearProformasComponent
  },
  {
    path: 'crear-proformas/:id',
    canActivate: [AuthenticationGuard],
    component:CrearProformasComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProformasRoutingModule { }
