import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminLoginComponent } from './admin/components/admin-login/admin-login.component';
import { AdminDashboardComponent } from './admin/components/admin-dashboard/admin-dashboard.component';
import { AdminHomeComponent } from './admin/components/admin-home/admin-home.component';
import { childAuthCACEmpGuard } from './core/guards/child-auth-cac-emp.guard';
import { ManageComponent } from './admin/components/manage/manage.component';
import { AddUserComponent } from './admin/components/add-user/add-user.component';


import { EmployeesComponent } from './admin/components/employees/employees.component';
import { childAuthCACGuard } from './core/guards/child-auth-cac.guard';

import { EmployeeLoginComponent } from './employee/components/employee-login/employee-login.component';
import { EmployeeDashboardComponent } from './employee/components/employee-dashboard/employee-dashboard.component';
import { EmployeeHomeComponent } from './employee/components/employee-home/employee-home.component';
import { EmployeeProfileComponent } from './employee/components/employee-profile/employee-profile.component';

import { UpdateEmployeeComponent } from './admin/components/update-employee/update-employee.component';
import { HeaderComponent } from './shared/components/header/header.component';
import { UpdateProfileComponent } from './employee/components/update-profile/update-profile.component';
import { ViewEmployeeComponent } from './admin/components/view-employee/view-employee.component';
import { LeaveComponent } from './employee/components/leave/leave.component';
import { ApplyLeaveComponent } from './employee/components/apply-leave/apply-leave.component';
import { LeaveRequestComponent } from './admin/components/leave-request/leave-request.component';
import { ContactsComponent } from './shared/components/contacts/contacts.component';
import { ContactsCreateComponent } from './shared/components/contacts-create/contacts-create.component';
import { ContactsViewComponent } from './shared/components/contacts-view/contacts-view.component';
import { ContactsEditComponent } from './shared/components/contacts-edit/contacts-edit.component';
import { LeadsComponent } from './shared/components/leads/leads.component';
import { LeadsCreateComponent } from './shared/components/leads-create/leads-create.component';
import { LeadsViewComponent } from './shared/components/leads-view/leads-view.component';
import { LeadsEditComponent } from './shared/components/leads-edit/leads-edit.component';

import { LeadsEditResolver } from './shared/resolver/lead-edit.resolver';
import { ActivitiesComponent } from './shared/components/activities/activities.component';
import { ActivitiesCreateComponent } from './shared/components/activities-create/activities-create.component';
import { ActivitiesViewComponent } from './shared/components/activities-view/activities-view.component';
import { ActivitiesEditComponent } from './shared/components/activities-edit/activities-edit.component';
import { ProductsComponent } from './shared/components/products/products.component';
import { ProductsCreateComponent } from './shared/components/products-create/products-create.component';
import { ProductsViewComponent } from './shared/components/products-view/products-view.component';
import { ProductsEditComponent } from './shared/components/products-edit/products-edit.component';


const routes: Routes = [

  {path:'admin-login',component:AdminLoginComponent,title:"Salesyncer Admin"},
  {path:'admin',component:AdminHomeComponent, title:"Salesyncer Admin",
  canActivateChild:[childAuthCACGuard] ,
   children: [
    { path: '', component: AdminDashboardComponent,title:'Salesyncer' },
    { path: 'employees', component: EmployeesComponent,title:'Salesyncer'},
    { path: 'manage', component: ManageComponent,title:'Salesyncer'},
    { path: 'add-user', component: AddUserComponent,title:'Salesyncer'},
    { path: 'update-employee', component: UpdateEmployeeComponent,title:'Salesyncer'},
    { path: 'view-employee', component: ViewEmployeeComponent,title:'Salesyncer'},
    { path: 'leave-request', component: LeaveRequestComponent,title:'Salesyncer'},
    { path: 'contacts', component: ContactsComponent,title:'Salesyncer'},
    { path: 'contacts-create', component: ContactsCreateComponent,title:'Salesyncer'},
    { path: 'contacts-view', component: ContactsViewComponent,title:'Salesyncer'},
    { path: 'contacts-edit', component: ContactsEditComponent,title:'Salesyncer'},
    { path: 'leads', component: LeadsComponent,resolve: { initData: LeadsEditResolver },title:'Salesyncer'},
    { path: 'leads-create', component: LeadsCreateComponent,title:'Salesyncer'},
    { path: 'leads-view', component: LeadsViewComponent,title:'Salesyncer'},
    { path: 'leads-edit', component: LeadsEditComponent,resolve: { initData: LeadsEditResolver }, title:'Salesyncer'},
    { path: 'activities', component: ActivitiesComponent},
    { path: 'activities-create', component: ActivitiesCreateComponent},
    { path: 'activities-view', component: ActivitiesViewComponent},
    { path: 'activities-edit', component: ActivitiesEditComponent},
    { path: 'products', component: ProductsComponent},
    { path: 'products-create', component: ProductsCreateComponent},
    { path: 'products-view', component: ProductsViewComponent},
    { path: 'products-edit', component: ProductsEditComponent},
  ]
},

{path:'login',component:EmployeeLoginComponent,title:"Salesyncer Login"},
  {path:'',component:EmployeeHomeComponent, title:"Salesyncer",
  canActivateChild:[childAuthCACEmpGuard],
   children: [
    { path: '', component: EmployeeDashboardComponent,title:'Salesyncer' },
    { path: 'profile', component: EmployeeProfileComponent,title:'Salesyncer'},
    { path: 'update-profile', component: UpdateProfileComponent,title:'Salesyncer'},
    { path: 'leave', component: LeaveComponent,title:'Salesyncer'},
    { path: 'apply-leave', component: ApplyLeaveComponent,title:'Salesyncer'},
    { path: 'contacts', component: ContactsComponent,title:'Salesyncer'},
    { path: 'contacts-create', component: ContactsCreateComponent,title:'Salesyncer'},
    { path: 'contacts-view', component: ContactsViewComponent,title:'Salesyncer'},
    { path: 'contacts-edit', component: ContactsEditComponent,title:'Salesyncer'},
    { path: 'leads', component: LeadsComponent,resolve: { initData: LeadsEditResolver },title:'Salesyncer'},
    { path: 'leads-create', component: LeadsCreateComponent,title:'Salesyncer'},
    { path: 'leads-view', component: LeadsViewComponent,title:'Salesyncer'},
    { path: 'leads-edit', component: LeadsEditComponent,resolve: { initData: LeadsEditResolver }, title:'Salesyncer'},
    { path: 'activities', component: ActivitiesComponent},
    { path: 'activities-create', component: ActivitiesCreateComponent},
    { path: 'activities-view', component: ActivitiesViewComponent},
    { path: 'activities-edit', component: ActivitiesEditComponent},
    { path: 'products', component: ProductsComponent},
    { path: 'products-create', component: ProductsCreateComponent},
    { path: 'products-view', component: ProductsViewComponent},
    { path: 'products-edit', component: ProductsEditComponent},

  ]
},
  




];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
