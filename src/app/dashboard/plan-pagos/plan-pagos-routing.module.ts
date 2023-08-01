import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ListaPlanPagosComponent } from './lista-plan-pagos/lista-plan-pagos.component';
import { AuthenticationGuard } from 'src/app/core/authentication/authentication.guard';

const routes: Routes = [
  {
    path: 'lista-plan-pagos/:id',
    canActivate: [AuthenticationGuard],
    component: ListaPlanPagosComponent
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
export class PlanPagosRoutingModule { }
