import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AuthenticationGuard } from 'src/app/core/authentication/authentication.guard';
import { ListaProveedoresComponent } from './lista-proveedores/lista-proveedores.component';

const routes: Routes = [
  {
    path: 'lista-proveedores',
    canActivate: [AuthenticationGuard],
    component: ListaProveedoresComponent
  }
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class ProveedoresRoutingModule { }
