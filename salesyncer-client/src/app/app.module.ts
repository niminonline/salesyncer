import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MaterialModule } from './shared/modules/material/material.module';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AdminModule } from './admin/admin.module';
import { EmployeeModule } from './employee/employee.module';
import { SharedModule } from './shared/shared.module';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';


import { AppComponent } from './app.component';
import { MainInterceptor } from './core/interceptors/main.interceptor';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    AdminModule,
    EmployeeModule,
    SharedModule,
    HttpClientModule
  ],
  exports: [],

  providers: [
    {provide:HTTP_INTERCEPTORS,useClass:MainInterceptor,multi:true}
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
