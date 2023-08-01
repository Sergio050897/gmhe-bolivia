import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AuthenticationGuard } from 'src/app/core/authentication/authentication.guard';
import { ListaClientesComponent } from './lista-clientes/lista-clientes.component';

const routes: Routes = [
  {
    path: 'lista-clientes',
    canActivate: [AuthenticationGuard],
    component: ListaClientesComponent
  }
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class ClientesRoutingModule { }
