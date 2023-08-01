import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AuthenticationGuard } from 'src/app/core/authentication/authentication.guard';
import { ListaMarcasComponent } from './lista-marcas/lista-marcas.component';

const routes: Routes = [
  {
    path: 'lista-marcas',
    canActivate: [AuthenticationGuard],
    component: ListaMarcasComponent
  }
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class MarcasRoutingModule { }
