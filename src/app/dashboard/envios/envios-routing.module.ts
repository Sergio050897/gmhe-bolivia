import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthenticationGuard } from 'src/app/core/authentication/authentication.guard';
import { CrearEnviosComponent } from './crear-envios/crear-envios.component';
import { ListarEnviosComponent } from './listar-envios/listar-envios.component';

const routes: Routes = [
  {
    path: 'envios',
    canActivate: [AuthenticationGuard],
    component: ListarEnviosComponent
  },
  {
    path: 'envios-crear',
    canActivate: [AuthenticationGuard],
    component: CrearEnviosComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EnviosRoutingModule { }
