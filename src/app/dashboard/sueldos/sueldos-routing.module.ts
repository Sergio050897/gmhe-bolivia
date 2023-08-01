import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AuthenticationGuard } from 'src/app/core/authentication/authentication.guard';
import { ListaSueldosComponent } from './lista-sueldos/lista-sueldos.component';

const routes: Routes = [
  {
    path: 'lista-sueldos',
    canActivate: [AuthenticationGuard],
    component: ListaSueldosComponent
  }
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class SueldosRoutingModule { }
