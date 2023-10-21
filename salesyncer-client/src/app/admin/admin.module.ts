import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminLoginComponent } from './components/admin-login/admin-login.component';
import { MaterialModule } from '../shared/modules/material/material.module';
import { SharedModule } from '../shared/shared.module';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';


@NgModule({
  declarations: [
    AdminLoginComponent,
    AdminDashboardComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    MaterialModule

  ]
})
export class AdminModule { }
