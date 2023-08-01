import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthenticationGuard } from 'src/app/core/authentication/authentication.guard';
import { ConfiguracionComponent } from './configuracion/configuracion.component';

const routes: Routes = [
  {
    path: 'configuraciones',
    canActivate: [AuthenticationGuard],
    component: ConfiguracionComponent
    
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ConfiguracionesRoutingModule { }
