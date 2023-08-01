import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthenticationGuard } from 'src/app/core/authentication/authentication.guard';
import { ListUsuarioComponent } from './list-usuario/list-usuario.component';
import { UsuarioComponent } from './usuario.component';

const routes: Routes = [
  {
    path: '', component: UsuarioComponent
  },
  {
    path: 'list-usuario',
    canActivate: [AuthenticationGuard],
    component: ListUsuarioComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsuarioRoutingModule { }
