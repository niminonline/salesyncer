import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppRoutingModule } from '../app-routing.module';
import { AdminLoginComponent } from './components/admin-login/admin-login.component';
import { MaterialModule } from '../shared/modules/material/material.module';
import { SharedModule } from '../shared/shared.module';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { AdminHomeComponent } from './components/admin-home/admin-home.component';
import { EmployeesComponent } from './components/employees/employees.component';
import { ManageComponent } from './components/manage/manage.component';
import { ManageBranchComponent } from './components/manage-branch/manage-branch.component';
import { AddUserComponent } from './components/add-user/add-user.component';
import { ViewEmployeeComponent } from './components/view-employee/view-employee.component';
import { LeaveRequestComponent } from './components/leave-request/leave-request.component';
import { ManageActivityTypeComponent } from './components/manage-activity-type/manage-activity-type.component';
import { ManageProductCategoryComponent } from './components/manage-product-category/manage-product-category.component';
import { AdminTargetComponent } from './components/admin-target/admin-target.component';
import { ManageLeadSourceComponent } from './components/manage-lead-source/manage-lead-source.component';


@NgModule({
  declarations: [
    AdminLoginComponent,
    AdminDashboardComponent,
    AdminHomeComponent,
    EmployeesComponent,
    ManageComponent,
    ManageBranchComponent,
    AddUserComponent,
    ViewEmployeeComponent,
    LeaveRequestComponent,
    ManageActivityTypeComponent,
    ManageProductCategoryComponent,
    AdminTargetComponent,
    ManageLeadSourceComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    MaterialModule,
    AppRoutingModule

  ]
})
export class AdminModule { }
