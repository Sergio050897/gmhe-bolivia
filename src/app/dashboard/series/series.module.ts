import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SeriesRoutingModule } from './series-routing.module';
import { ListaSeriesComponent } from './lista-series/lista-series.component';
import { CrearSeriesComponent } from './crear-series/crear-series.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ComponentsModule } from '../../components/components.module';
import { NgSelectModule } from '@ng-select/ng-select';

@NgModule({
  declarations: [
    ListaSeriesComponent,
    CrearSeriesComponent
  ],
  imports: [
    CommonModule,
    SeriesRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgSelectModule,
    ComponentsModule
  ]
})
export class SeriesModule { }
