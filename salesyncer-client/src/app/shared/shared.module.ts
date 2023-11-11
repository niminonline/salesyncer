import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginBlockComponent } from './components/login-block/login-block.component';
import { HeaderComponent } from './components/header/header.component';
import { SideNavbarMenuComponent } from './components/side-navbar-menu/side-navbar-menu.component';
import { TableComponent } from './components/table/table.component';
import { MaterialModule } from './modules/material/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { TwoDecimalDigitsPipe } from './pipes/two-decimal-digits.pipe';
import { UpdateEmployeeComponent } from '../admin/components/update-employee/update-employee.component';
import { ContactsComponent } from './components/contacts/contacts.component';
import { ContactsViewComponent } from './components/contacts-view/contacts-view.component';
import { ContactsEditComponent } from './components/contacts-edit/contacts-edit.component';
import { ContactsCreateComponent } from './components/contacts-create/contacts-create.component';
import { LeadsComponent } from './components/leads/leads.component';
import { LeadsViewComponent } from './components/leads-view/leads-view.component';
import { LeadsEditComponent } from './components/leads-edit/leads-edit.component';
import { LeadsCreateComponent } from './components/leads-create/leads-create.component';
import { ActivitiesComponent } from './components/activities/activities.component';
import { ActivitiesCreateComponent } from './components/activities-create/activities-create.component';
import { ActivitiesEditComponent } from './components/activities-edit/activities-edit.component';
import { ActivitiesViewComponent } from './components/activities-view/activities-view.component';
import { ProductsComponent } from './components/products/products.component';
import { ProductsCreateComponent } from './components/products-create/products-create.component';
import { ProductsViewComponent } from './components/products-view/products-view.component';
import { ProductsEditComponent } from './components/products-edit/products-edit.component';
import { SalesComponent } from './components/sales/sales.component';
import { SalesCreateComponent } from './components/sales-create/sales-create.component';
import { SalesEditComponent } from './components/sales-edit/sales-edit.component';
import { SalesViewComponent } from './components/sales-view/sales-view.component';
import { TargetCardComponent } from './components/target-card/target-card.component';

const components = [
  LoginBlockComponent,
  HeaderComponent,
  SideNavbarMenuComponent,
  TableComponent,
  UpdateEmployeeComponent,
  TargetCardComponent,
  
];

@NgModule({
  declarations: [
    components,
    TwoDecimalDigitsPipe,
    ContactsComponent,
    ContactsViewComponent,
    ContactsEditComponent,
    ContactsCreateComponent,
    LeadsComponent,
    LeadsViewComponent,
    LeadsEditComponent,
    LeadsCreateComponent,
    ActivitiesComponent,
    ActivitiesCreateComponent,
    ActivitiesEditComponent,
    ActivitiesViewComponent,
    ProductsComponent,
    ProductsCreateComponent,
    ProductsViewComponent,
    ProductsEditComponent,
    SalesComponent,
    SalesCreateComponent,
    SalesEditComponent,
    SalesViewComponent,
    TargetCardComponent,
    
  ],
  imports: [CommonModule, MaterialModule, ReactiveFormsModule,],
  exports: [components, TwoDecimalDigitsPipe],
})
export class SharedModule {}
