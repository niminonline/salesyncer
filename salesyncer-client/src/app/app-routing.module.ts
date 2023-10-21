import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminLoginComponent } from './admin/components/admin-login/admin-login.component';
import { AdminDashboardComponent } from './admin/components/admin-dashboard/admin-dashboard.component';
import { AdminHomeComponent } from './admin/components/admin-home/admin-home.component';
import { EmployeesComponent } from './admin/components/employees/employees.component';

const routes: Routes = [

  {path:'admin',component:AdminLoginComponent,title:"Salesyncer Admin"},
  {path:'admin/home',component:AdminHomeComponent,title:"Admin Dashboard", children: [
    { path: '', component: AdminDashboardComponent,title:'Salesyncer | Admin Panel' },
    { path: 'employees', component: EmployeesComponent,title:'Salesyncer | Admin Panel'}
  ]
},
  




];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
