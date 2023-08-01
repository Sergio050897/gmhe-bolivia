import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';

import { PedidosRoutingModule } from './pedidos-routing.module';
import { ListPedidosComponent } from './list-pedidos/list-pedidos.component';
import { CrearPedidosComponent } from './crear-pedidos/crear-pedidos.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { ModalIngresoComponent } from './modal-ingreso/modal-ingreso.component';
import { NgbPopoverModule } from '@ng-bootstrap/ng-bootstrap';


@NgModule({
  declarations: [
    ListPedidosComponent,
    CrearPedidosComponent,
    ModalIngresoComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgSelectModule,
    PedidosRoutingModule,
    NgbPopoverModule
  ],
  providers: [
    DatePipe,
  ]
})
export class PedidosModule { }
