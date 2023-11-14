import { NgModule,isDevMode } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmployeeLoginComponent } from './components/employee-login/employee-login.component';
import { EmployeeDashboardComponent } from './components/employee-dashboard/employee-dashboard.component';
import { EmployeeProfileComponent } from './components/employee-profile/employee-profile.component';
import { EmployeeHomeComponent } from './components/employee-home/employee-home.component';
import { MaterialModule } from '../shared/modules/material/material.module';
import { SharedModule } from '../shared/shared.module';
import { AppRoutingModule } from '../app-routing.module';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';
import { authReducer } from '../shared/store/reducers/auth.reducer';
import { userReducer } from '../shared/store/reducers/user.reducer';
import { contactsReducer } from '../shared/store/reducers/contacts.reducer';
import { UserEffects } from '../shared/store/effects/user.effects';
import { ContactsEffects } from '../shared/store/effects/contacts.effects';
import { UpdateProfileComponent } from './components/update-profile/update-profile.component';
import { ApplyLeaveComponent } from './components/apply-leave/apply-leave.component';
import { LeaveComponent } from './components/leave/leave.component';
import { ViewTargetComponent } from './components/view-target/view-target.component';
import { BranchDataEffects } from '../shared/store/effects/branchData.effects';
import { branchDataReducer } from '../shared/store/reducers/branchData.reducer';



@NgModule({
  declarations: [
    EmployeeLoginComponent,
    EmployeeDashboardComponent,
    EmployeeProfileComponent,
    EmployeeHomeComponent,
    UpdateProfileComponent,
    ApplyLeaveComponent,
    LeaveComponent,
    ViewTargetComponent,
  ],
  imports: [
    CommonModule,
    MaterialModule,
    SharedModule,
    AppRoutingModule,
    StoreModule.forRoot({ user: userReducer ,auth: authReducer,contacts:contactsReducer,branchData:branchDataReducer}, {}),
    EffectsModule.forRoot([UserEffects,ContactsEffects,BranchDataEffects]),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: !isDevMode() }),
    
  ]
})
export class EmployeeModule { }
