import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VentasRoutingModule } from './ventas-routing.module';
import { ListarVentasComponent } from './listar-ventas/listar-ventas.component';
import { CrearVentasComponent } from './crear-ventas/crear-ventas.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { DetalleVentasComponent } from './detalle-ventas/detalle-ventas.component';
import { NgbModule, NgbPopoverModule } from '@ng-bootstrap/ng-bootstrap';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { SwitchComponent } from 'src/app/components/switch/switch.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    ListarVentasComponent,
    CrearVentasComponent,
    DetalleVentasComponent
  ],
  imports: [
    CommonModule,
    VentasRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgSelectModule,
    NgbModule,
    PerfectScrollbarModule,
    SharedModule,
    NgbPopoverModule
  ],
  exports:[
    DetalleVentasComponent
  ]
})
export class VentasModule { }
