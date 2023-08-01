import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthenticationGuard } from 'src/app/core/authentication/authentication.guard';
import { ListarAlmacenComponent } from './listar-almacen/listar-almacen.component';

const routes: Routes = [
  {
    path: 'list-almacen',
    canActivate: [AuthenticationGuard],
    component: ListarAlmacenComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AlmacenRoutingModule { }
