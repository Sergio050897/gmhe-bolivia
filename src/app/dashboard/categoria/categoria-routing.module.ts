import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthenticationGuard } from 'src/app/core/authentication/authentication.guard';
import { ListaCategoriaComponent } from './lista-categoria/lista-categoria.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'lista-categoria',
    canActivate: [AuthenticationGuard],
    component: ListaCategoriaComponent
  }
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class CategoriaRoutingModule { }
