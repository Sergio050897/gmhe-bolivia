import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlanPagosRoutingModule } from './plan-pagos-routing.module';
import { ListaPlanPagosComponent } from './lista-plan-pagos/lista-plan-pagos.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';



@NgModule({
  declarations: [
    ListaPlanPagosComponent
  ],
  imports: [
    CommonModule,
    PlanPagosRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgSelectModule
  ]
})
export class PlanPagosModule { }
