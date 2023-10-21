import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmployeeLoginComponent } from './components/employee-login/employee-login.component';
import { EmployeeDashboardComponent } from './components/employee-dashboard/employee-dashboard.component';



@NgModule({
  declarations: [
    EmployeeLoginComponent,
    EmployeeDashboardComponent
  ],
  imports: [
    CommonModule
  ]
})
export class EmployeeModule { }
