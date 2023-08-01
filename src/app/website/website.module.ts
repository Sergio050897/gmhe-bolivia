import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WebsiteRoutingModule } from './website-routing.module';
import { InicioComponent } from './inicio/inicio.component';
import { ProductoCardComponent } from './producto-card/producto-card.component';
import { QuienesSomosComponent } from './quienes-somos/quienes-somos.component';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { CartComponent } from './cart/cart.component';
import {  FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SearchComponent } from './search/search.component';
import { ServiciosComponent } from './quienes-somos/servicios/servicios.component';
import { ContactanosComponent } from './quienes-somos/contactanos/contactanos.component';
import { RegisterComponent } from './cart/register/register.component';
import { PresentacionComponent } from './presentacion/presentacion.component';
import { PreviewComponent } from './product-details/preview/preview.component';
import { ThumbComponent } from './product-details/thumb/thumb.component';
import { NgbPopoverModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    InicioComponent,
    ProductoCardComponent,
    QuienesSomosComponent,
    ProductListComponent,
    ProductDetailsComponent,
    CartComponent,
    SearchComponent,
    ServiciosComponent,
    ContactanosComponent,
    RegisterComponent,
    PresentacionComponent,
    PreviewComponent,
    ThumbComponent

  ],
  imports: [
    CommonModule,
    WebsiteRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    NgbPopoverModule
  ]
})
export class WebsiteModule { }
