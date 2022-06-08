/*  This project depends on the IceBox 360 Theme by David Odoh
    Copywrite IceBox 360 Theme by David Odoh 
*/
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

import { AuthLayoutComponent } from './components/auth-layout/auth-layout.component';
import { UserLayoutComponent } from './components/user-layout/user-layout.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { AccountMenuComponent } from './components/sidebar/account-menu/account-menu.component';
import { ExtrasMenuComponent } from './components/sidebar/extras-menu/extras-menu.component';
import { DirectiveModule } from './directives/directive.module';


const exportedClasses = [
  AuthLayoutComponent,
  UserLayoutComponent,
  SidebarComponent,
  AccountMenuComponent,
  ExtrasMenuComponent
];

@NgModule({
  declarations: exportedClasses,
  imports: [
    CommonModule,
    RouterModule,
    DirectiveModule,
  ],
  exports: exportedClasses
})
export class SharedModule { }
