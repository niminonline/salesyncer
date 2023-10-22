import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmployeeLoginComponent } from './components/employee-login/employee-login.component';
import { EmployeeDashboardComponent } from './components/employee-dashboard/employee-dashboard.component';
import { EmployeeProfileComponent } from './components/employee-profile/employee-profile.component';
import { EmployeeHomeComponent } from './components/employee-home/employee-home.component';
import { MaterialModule } from '../shared/modules/material/material.module';
import { SharedModule } from '../shared/shared.module';
import { AppRoutingModule } from '../app-routing.module';



@NgModule({
  declarations: [
    EmployeeLoginComponent,
    EmployeeDashboardComponent,
    EmployeeProfileComponent,
    EmployeeHomeComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    SharedModule,
    AppRoutingModule,
  ]
})
export class EmployeeModule { }
