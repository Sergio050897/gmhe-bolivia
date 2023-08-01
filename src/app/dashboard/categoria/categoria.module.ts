import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CrearCategoriaComponent } from './crear-categoria/crear-categoria.component';
import { ListaCategoriaComponent } from './lista-categoria/lista-categoria.component';
import { CategoriaRoutingModule } from './categoria-routing.module';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  declarations: [
    CrearCategoriaComponent,
    ListaCategoriaComponent
  ],
  imports: [
    CommonModule,
    CategoriaRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    ComponentsModule
  ]
})
export class CategoriaModule { }
