import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserProfileRoutingModule } from './user-profile-routing.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { UserProfileComponent } from './user-profile.component';
import { CambiarPasswordComponent } from './cambiar-password/cambiar-password.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ComponentsModule } from '../components/components.module';


@NgModule({
  declarations: [UserProfileComponent, CambiarPasswordComponent],
  imports: [
    CommonModule,
    UserProfileRoutingModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    ComponentsModule
  ]
})
export class UserProfileModule { }
