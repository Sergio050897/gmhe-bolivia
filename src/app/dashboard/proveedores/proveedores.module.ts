import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProveedoresRoutingModule } from './proveedores-routing.module';
import { ListaProveedoresComponent } from './lista-proveedores/lista-proveedores.component';
import { CrearProveedoresComponent } from './crear-proveedores/crear-proveedores.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ComponentsModule } from 'src/app/components/components.module';


@NgModule({
  declarations: [
    ListaProveedoresComponent,
    CrearProveedoresComponent
  ],
  imports: [
    CommonModule,
    ProveedoresRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    ComponentsModule
  ]
})
export class ProveedoresModule { }
