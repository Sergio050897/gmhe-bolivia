import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UnidadesRoutingModule } from './unidades-routing.module';
import { UnidadComponent } from './unidad/unidad.component';
import { FormModule } from 'src/app/form/form.module';
import { ReactiveFormsModule } from '@angular/forms';
import { ComponentsModule } from 'src/app/components/components.module';
import { CrearComponent } from './crear/crear.component';


@NgModule({
  declarations: [
    UnidadComponent,
    CrearComponent
  ],
  imports: [
    CommonModule,
    UnidadesRoutingModule,
    FormModule,
    ReactiveFormsModule, 
    ComponentsModule   
  ]
})
export class UnidadesModule { }
