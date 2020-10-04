import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from "./login/login.component";
import { MainComponent } from "./main/main.component";
import { DasboardComponent } from "./dasboard/dasboard.component";

import { UserComponent } from "./user/user.component";
import { CompanyComponent } from "./company/company.component";
import { CustomerComponent } from "./customer/customer.component";
import { DocketsComponent } from "./dockets/dockets.component";

import { AddCompanyComponent } from "./add-company/add-company.component";
import { AddCustomerComponent } from "./add-customer/add-customer.component";
import { AddUserComponent } from "./add-user/add-user.component";
import { AddDocketsComponent } from "./add-dockets/add-dockets.component";
import { AddDocumentComponent } from "./add-document/add-document.component";
import { ReportComponent } from "./report/report.component";
import { UpdateCompanyComponent } from "./update-company/update-company.component";
import { UpdateUserComponent } from "./update-user/update-user.component";
import { UpdateDocketComponent } from "./update-docket/update-docket.component";
import { UpdateCustomerComponent } from "./update-customer/update-customer.component";
import { ViewDocumentComponent } from "./view-document/view-document.component";

import { AuthguardGuard }   from './authguard.guard';

const routes: Routes = [
  { component : LoginComponent, path: "" },
  { component : LoginComponent, path: "Login" },
  { component : MainComponent, path: "main", canActivate: [AuthguardGuard], 
    children:[
      { component: DasboardComponent, path: ''},
      { component: DasboardComponent, path: 'Dasboard'},
      { component: UserComponent, path: 'User' },
      { component: CompanyComponent, path: 'Company' },
      { component: CustomerComponent, path: 'Customer' },
      { component: DocketsComponent, path: 'Dockets' },
      { component: AddCompanyComponent, path: 'AddCompany' },
      { component: AddCustomerComponent, path: 'AddCustomer' },
      { component: AddUserComponent, path: 'AddUser' },
      { component: AddDocketsComponent, path: 'AddDockets' },
      { component: AddDocumentComponent, path: 'AddDocument' },
      { component: ReportComponent, path: 'Report' },
      { component: UpdateCompanyComponent, path: 'UpdateCompany' },
      { component: UpdateUserComponent, path: 'UpdateUser' },
      { component: UpdateDocketComponent, path: 'UpdateDocket' },
      { component: UpdateCustomerComponent, path: 'UpdateCustomer' },
      { component: ViewDocumentComponent, path: 'ViewDocument' },
    ] 
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
