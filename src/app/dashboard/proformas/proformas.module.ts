import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProformasRoutingModule } from './proformas-routing.module';
import { ListProformasComponent } from './list-proformas/list-proformas.component';
import { CrearProformasComponent } from './crear-proformas/crear-proformas.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { VerPdfComponent } from './ver-pdf/ver-pdf.component';
import { ClientesModule } from '../clientes/clientes.module';
import { NgbPopoverModule } from '@ng-bootstrap/ng-bootstrap';


@NgModule({
  declarations: [
    ListProformasComponent,
    CrearProformasComponent,
    VerPdfComponent,
  ],
  imports: [
    CommonModule,
    ProformasRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgSelectModule,
    ClientesModule,
    NgbPopoverModule
  ]
})
export class ProformasModule { }
