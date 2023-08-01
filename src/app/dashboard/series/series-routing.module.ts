import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AuthenticationGuard } from 'src/app/core/authentication/authentication.guard';
import { ListaSeriesComponent } from './lista-series/lista-series.component';

const routes: Routes = [
  {
    path: 'lista-series',
    canActivate: [AuthenticationGuard],
    component: ListaSeriesComponent
  }
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class SeriesRoutingModule { }
