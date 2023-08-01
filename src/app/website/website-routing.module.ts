import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CartComponent } from './cart/cart.component';
import { InicioComponent } from './inicio/inicio.component';
import { PresentacionComponent } from './presentacion/presentacion.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { ContactanosComponent } from './quienes-somos/contactanos/contactanos.component';
import { QuienesSomosComponent } from './quienes-somos/quienes-somos.component';
import { ServiciosComponent } from './quienes-somos/servicios/servicios.component';

const routes: Routes = [ 
  
  {
    path: '',
    component: PresentacionComponent,
    data: {
      title: 'Pagina-Detalle'
    }
  },
  {
    path: 'productos',
    component: InicioComponent,
    data: {
      title: 'Pagina-Detalle'
    }
  },
  {
    path: 'nosotros',
    component: QuienesSomosComponent,
    data: {
      title: 'Quienes Somos'
    }
  },
  {
    path: 'servicios',
    component: ServiciosComponent,
    data: {
      title: 'Quienes Somos'
    }
  },
  {
    path: 'contactanos',
    component: ContactanosComponent,
    data: {
      title: 'Quienes Somos'
    }
  },
  {
    path: 'cart',
    component: CartComponent,
    data: {
      title: 'Quienes Somos'
    }
  },
  {
    path: 'productos/:id',
    component: ProductDetailsComponent,
    data: {
      title: 'Detalles del producto'
    }
  },
 
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WebsiteRoutingModule { }
