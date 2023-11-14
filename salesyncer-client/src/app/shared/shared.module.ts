import { NgModule, isDevMode } from '@angular/core';
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
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { branchDataReducer } from './store/reducers/branchData.reducer';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { BranchDataEffects } from './store/effects/branchData.effects';
import { userReducer } from './store/reducers/user.reducer';
import { contactsReducer } from './store/reducers/contacts.reducer';
import { authReducer } from './store/reducers/auth.reducer';
import { ContactsEffects } from './store/effects/contacts.effects';
import { UserEffects } from './store/effects/user.effects';
import { leadsDataReducer } from './store/reducers/leadsData.reducer';
import { LeadsDataEffects } from './store/effects/leadsData.effects';
import { leadSourceDataReducer } from './store/reducers/leadSourceData.reducer';
import { LeadSourceDataEffects } from './store/effects/leadSourceData.effects';
import { ProductsDataEffects } from './store/effects/productsData.effects ';
import { productsDataReducer } from './store/reducers/productsData.reducer';
import { productCategoriesDataReducer } from './store/reducers/productCategoriesData.reducer';
import { ProductCategoriesDataEffects } from './store/effects/productCategoriesData.effects';

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
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
    StoreModule.forRoot(
      {
        user: userReducer,
        auth: authReducer,
        contacts: contactsReducer,
        branchData: branchDataReducer,
        leadsData: leadsDataReducer,
        leadSourceData: leadSourceDataReducer,
        productsData:productsDataReducer,
        productCategoriesData:productCategoriesDataReducer
      },
      {}
    ),
    EffectsModule.forRoot([
      UserEffects,
      ContactsEffects,
      BranchDataEffects,
      LeadsDataEffects,
      LeadSourceDataEffects,
      ProductsDataEffects,
      ProductCategoriesDataEffects
    ]),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: !isDevMode() }),
  ],
  exports: [components, TwoDecimalDigitsPipe],
})
export class SharedModule {}
