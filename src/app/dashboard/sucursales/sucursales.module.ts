import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SucursalesRoutingModule } from './sucursales-routing.module';
import { ListaSucursalesComponent } from './lista-sucursales/lista-sucursales.component';
import { CrearSucursalesComponent } from './crear-sucursales/crear-sucursales.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ComponentsModule } from 'src/app/components/components.module';



@NgModule({
  declarations: [
    ListaSucursalesComponent,
    CrearSucursalesComponent
  ],
  imports: [
    CommonModule,
    SucursalesRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    ComponentsModule
  ]
})
export class SucursalesModule { }
