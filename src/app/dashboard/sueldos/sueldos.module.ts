import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SueldosRoutingModule } from './sueldos-routing.module';
import { ListaSueldosComponent } from './lista-sueldos/lista-sueldos.component';
import { CrearSueldosComponent } from './crear-sueldos/crear-sueldos.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ComponentsModule } from 'src/app/components/components.module';



@NgModule({
  declarations: [
    ListaSueldosComponent,
    CrearSueldosComponent
  ],
  imports: [
    CommonModule,
    SueldosRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    ComponentsModule
  ]
})
export class SueldosModule { }
