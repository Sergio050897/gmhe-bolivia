import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AuthenticationGuard } from 'src/app/core/authentication/authentication.guard';
import { ListaProductosComponent } from './lista-productos/lista-productos.component';
import { CrearProductosComponent } from './crear-productos/crear-productos.component';

const routes: Routes = [
  {
    path: 'lista-productos',
    canActivate: [AuthenticationGuard],
    component: ListaProductosComponent
  },
  {
    path: 'crear-productos',
    canActivate: [AuthenticationGuard],
    component: CrearProductosComponent
  },
  {
    path: 'crear-productos/:id',
    canActivate: [AuthenticationGuard],
    component: CrearProductosComponent
  },
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class ProductosRoutingModule { }
