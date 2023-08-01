import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductosRoutingModule } from './productos-routing.module';
import { ListaProductosComponent } from './lista-productos/lista-productos.component';
import { CrearProductosComponent } from './crear-productos/crear-productos.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ComponentsModule } from '../../components/components.module';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';

@NgModule({
  declarations: [
    ListaProductosComponent,
    CrearProductosComponent
  ],
  imports: [
    CommonModule,
    ProductosRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    ComponentsModule,
    NgSelectModule,
    NgbModule,
    CKEditorModule,
    NgSelectModule
  ]
})
export class ProductosModule { }
