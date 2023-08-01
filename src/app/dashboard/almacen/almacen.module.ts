import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AlmacenRoutingModule } from './almacen-routing.module';
import { ListarAlmacenComponent } from './listar-almacen/listar-almacen.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    ListarAlmacenComponent
  ],
  imports: [
    CommonModule,
    AlmacenRoutingModule,
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class AlmacenModule { }
