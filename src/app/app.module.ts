import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';
import { MainComponent } from './main/main.component';
import { DasboardComponent } from './dasboard/dasboard.component';
import { UserComponent } from './user/user.component';
import { CompanyComponent } from './company/company.component';
import { CustomerComponent } from './customer/customer.component';
import { DocketsComponent } from './dockets/dockets.component';
import { AddUserComponent } from './add-user/add-user.component';
import { AddCompanyComponent } from './add-company/add-company.component';
import { AddCustomerComponent } from './add-customer/add-customer.component';
import { AddDocketsComponent } from './add-dockets/add-dockets.component';
import { UpdateCompanyComponent } from './update-company/update-company.component';
import { UpdateUserComponent } from './update-user/update-user.component';
import { UpdateDocketComponent } from './update-docket/update-docket.component';
import { UpdateCustomerComponent } from './update-customer/update-customer.component';
// Dropzone
import { NgxDropzoneModule } from 'ngx-dropzone';

import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { AddDocumentComponent } from './add-document/add-document.component';
import { ReportComponent } from './report/report.component';
// Reactive Forms
import { ReactiveFormsModule } from '@angular/forms';
// Http
import { HttpClientModule }    from '@angular/common/http';
// Cookie
import { CookieService } from 'ngx-cookie-service';
// Auth Guard
import { AuthguardGuard } from './authguard.guard';
import { UserService } from "./user.service";

// Services
import { commonService } from './services/commonService';
import { companyService } from './services/companyService';
import { userService } from './services/userService';
import { docketService } from './services/docketService';
import { customerService } from './services/customerService';
import { customerDocumentService } from './services/customerDocumentService';
import { doumentService } from './services/documentService';
import { ViewDocumentComponent } from './view-document/view-document.component';
import { docbox } from './services/docbox';




@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    MainComponent,
    DasboardComponent,
    UserComponent,
    CompanyComponent,
    CustomerComponent,
    DocketsComponent,
    AddUserComponent,
    AddCompanyComponent,
    AddCustomerComponent,
    AddDocketsComponent,
    AddDocumentComponent,
    ReportComponent,
    UpdateCompanyComponent,
    UpdateUserComponent,
    UpdateDocketComponent,
    UpdateCustomerComponent,
    ViewDocumentComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    NgxDropzoneModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [
    {provide: LocationStrategy, useClass: HashLocationStrategy},
    AuthguardGuard,
    UserService,
    CookieService,
    commonService,
    companyService,
    userService,
    docketService,
    customerService,
    customerDocumentService,
    doumentService,
    docbox
  ],
  entryComponents: [AddDocumentComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
