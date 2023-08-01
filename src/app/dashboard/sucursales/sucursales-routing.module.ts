import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AuthenticationGuard } from 'src/app/core/authentication/authentication.guard';
import { ListaSucursalesComponent } from '../sucursales/lista-sucursales/lista-sucursales.component';


const routes: Routes = [
  {
    path: 'lista-sucursales',
    canActivate: [AuthenticationGuard],
    component: ListaSucursalesComponent
  }
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})

export class SucursalesRoutingModule { }
