import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginBlockComponent } from './components/login-block/login-block.component';
import { HeaderComponent } from './components/header/header.component';
import { SideNavbarMenuComponent } from './components/side-navbar-menu/side-navbar-menu.component';
import { TableComponent } from './components/table/table.component';
import { MaterialModule } from './modules/material/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { TwoDecimalDigitsPipe } from './pipes/two-decimal-digits.pipe';
import { UpdateEmployeeComponent } from './components/update-employee/update-employee.component';

const components = [
  LoginBlockComponent,
  HeaderComponent,
  SideNavbarMenuComponent,
  TableComponent,
];

@NgModule({
  declarations: [components, TwoDecimalDigitsPipe, UpdateEmployeeComponent],
  imports: [CommonModule, MaterialModule, ReactiveFormsModule],
  exports: [components,TwoDecimalDigitsPipe],
})
export class SharedModule {}
