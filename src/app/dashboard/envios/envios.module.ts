import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EnviosRoutingModule } from './envios-routing.module';
import { ListarEnviosComponent } from './listar-envios/listar-envios.component';
import { CrearEnviosComponent } from './crear-envios/crear-envios.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    ListarEnviosComponent,
    CrearEnviosComponent
  ],
  imports: [
    CommonModule,
    EnviosRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgSelectModule
  ]
})
export class EnviosModule { }
