import { NgModule } from '@angular/core';
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';

import { FooterComponent } from "./footer/footer.component";
import { NavbarComponent } from "./navbar/navbar.component";
import { SidebarComponent } from "./sidebar/sidebar.component";
import { ColorSwitcherComponent } from './color-switcher/color-switcher.component';
import { HasPermissionDirective } from './has-permission.directive';
import { HasRolesDirective } from './has-roles.directive';


@NgModule({
  exports: [
    CommonModule,
    FooterComponent,
    NavbarComponent,
    SidebarComponent,
    ColorSwitcherComponent,
    NgbModule,
    HasPermissionDirective,
    HasRolesDirective
  ],
  imports: [
    RouterModule,
    CommonModule,
    NgbModule,
    PerfectScrollbarModule
  ],
  declarations: [
    FooterComponent,
    NavbarComponent,
    SidebarComponent,
    ColorSwitcherComponent,
    HasPermissionDirective,
    HasRolesDirective
  ],
  providers: [],
})
export class SharedModule { }
