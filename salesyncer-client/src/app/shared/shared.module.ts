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

const components = [
  LoginBlockComponent,
  HeaderComponent,
  SideNavbarMenuComponent,
  TableComponent,
  UpdateEmployeeComponent
];

@NgModule({
  declarations: [components, TwoDecimalDigitsPipe, ContactsComponent, ContactsViewComponent, ContactsEditComponent, ContactsCreateComponent],
  imports: [CommonModule, MaterialModule, ReactiveFormsModule],
  exports: [components,TwoDecimalDigitsPipe],
})
export class SharedModule {}
