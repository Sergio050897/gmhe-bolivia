import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MarcasRoutingModule } from '../marcas/marcas-routing.module';
import { ListaMarcasComponent } from './lista-marcas/lista-marcas.component';
import { CrearMarcasComponent } from './crear-marcas/crear-marcas.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ComponentsModule } from '../../components/components.module';
import { NgSelectModule } from '@ng-select/ng-select';

@NgModule({
  declarations: [
    ListaMarcasComponent,
    CrearMarcasComponent
  ],
  imports: [
    CommonModule,
    MarcasRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgSelectModule,
    ComponentsModule
  ]
})
export class MarcasModule { }
