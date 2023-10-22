import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminLoginComponent } from './admin/components/admin-login/admin-login.component';
import { AdminDashboardComponent } from './admin/components/admin-dashboard/admin-dashboard.component';
import { AdminHomeComponent } from './admin/components/admin-home/admin-home.component';
import { EmployeesComponent } from './admin/components/employees/employees.component';
import { childAuthCACGuard } from './core/guards/child-auth-cac.guard';
import { ManageComponent } from './admin/components/manage/manage.component';
import { AddUserComponent } from './admin/components/add-user/add-user.component';

import { EmployeeLoginComponent } from './employee/components/employee-login/employee-login.component';
import { EmployeeDashboardComponent } from './employee/components/employee-dashboard/employee-dashboard.component';
import { EmployeeHomeComponent } from './employee/components/employee-home/employee-home.component';
import { EmployeeProfileComponent } from './employee/components/employee-profile/employee-profile.component';


const routes: Routes = [

  {path:'admin-login',component:AdminLoginComponent,title:"Salesyncer Admin"},
  {path:'admin',component:AdminHomeComponent, title:"Salesyncer Admin",
  canActivateChild:[childAuthCACGuard] ,
   children: [
    { path: '', component: AdminDashboardComponent,title:'Salesyncer | Admin Panel' },
    { path: 'employees', component: EmployeesComponent,title:'Salesyncer | Employees'},
    { path: 'manage', component: ManageComponent,title:'Salesyncer | Manage'},
    { path: 'add-user', component: AddUserComponent,title:'Salesyncer | Add user'},
  ]
},

{path:'login',component:EmployeeLoginComponent,title:"Salesyncer Login"},
  {path:'',component:EmployeeHomeComponent, title:"Salesyncer Home",
  canActivateChild:[childAuthCACGuard],
   children: [
    { path: '', component: AdminDashboardComponent,title:'Salesyncer ' },
    { path: 'profile', component: EmployeeProfileComponent,title:'Salesyncer | Profile'},
  ]
},
  




];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
