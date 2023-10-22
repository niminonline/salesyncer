import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminLoginComponent } from './admin/components/admin-login/admin-login.component';
import { AdminDashboardComponent } from './admin/components/admin-dashboard/admin-dashboard.component';
import { AdminHomeComponent } from './admin/components/admin-home/admin-home.component';
import { EmployeesComponent } from './admin/components/employees/employees.component';
import { childAuthCACGuard } from './core/guards/child-auth-cac.guard';
import { ManageComponent } from './admin/components/manage/manage.component';

const routes: Routes = [

  {path:'admin-login',component:AdminLoginComponent,title:"Salesyncer Admin"},
  {path:'admin',component:AdminHomeComponent, title:"Salesyncer Admin",
  canActivateChild:[childAuthCACGuard] ,
   children: [
    { path: '', component: AdminDashboardComponent,title:'Salesyncer | Admin Panel' },
    { path: 'employees', component: EmployeesComponent,title:'Salesyncer | Employees'},
    { path: 'manage', component: ManageComponent,title:'Salesyncer | Manage'},
  ]
},
  




];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
