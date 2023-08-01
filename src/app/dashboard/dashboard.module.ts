import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HighchartsChartModule } from 'highcharts-angular';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';

import { AnalyticsComponent } from './analytics/analytics.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { ComponentsModule } from '../components/components.module';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { NgbDatepickerModule, NgbModalModule, NgbTimepickerModule } from '@ng-bootstrap/ng-bootstrap';
import { registerLocaleData } from '@angular/common';
import localeEs from '@angular/common/locales/es';
import { DateTimePickerComponent } from '../application/fullcalendar/date-time-picker.component';
// import { CrearCategoriaComponent } from './categoria/crear-categoria/crear-categoria.component';

registerLocaleData(localeEs);

@NgModule({
  declarations: [
    AnalyticsComponent,
    DateTimePickerComponent,
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    PerfectScrollbarModule,
    HighchartsChartModule,
    ReactiveFormsModule,
    SweetAlert2Module,
    InfiniteScrollModule,
    // NgSelectModule,
    ComponentsModule,
    PerfectScrollbarModule,
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory
    }),
    NgbModalModule,
    NgbDatepickerModule,
    NgbTimepickerModule,
    FormsModule,
   
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
  // providers: [
  //   AuthenticationGuard
  // ],
})
export class DashboardModule { }
