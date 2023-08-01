import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsuarioRoutingModule } from './usuario-routing.module';
import { UsuarioComponent } from './usuario.component';
import { ListUsuarioComponent } from './list-usuario/list-usuario.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CreateUsuarioComponent } from './create-usuario/create-usuario.component';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { ComponentsModule } from 'src/app/components/components.module';

import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { NgSelectModule } from '@ng-select/ng-select';

@NgModule({
  declarations: [
    UsuarioComponent,
    ListUsuarioComponent,
    CreateUsuarioComponent
  ],
  imports: [
    CommonModule,
    UsuarioRoutingModule,
    ReactiveFormsModule,
    SweetAlert2Module,
    ComponentsModule,
    InfiniteScrollModule,
    NgSelectModule
  ],
})
export class UsuarioModule { }
