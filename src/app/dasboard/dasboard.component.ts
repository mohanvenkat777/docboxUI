import { Component, OnInit } from '@angular/core';
import { commonService } from "../services/commonService";
import { companyService } from "../services/companyService";

@Component({
  selector: 'app-dasboard',
  templateUrl: './dasboard.component.html',
  styleUrls: ['./dasboard.component.scss']
})
export class DasboardComponent implements OnInit {

  Users : number;
  Customers : number;
  Document : number;
  PendingDocument : number;
  user: boolean = true;
  companyList: any;
  loader2: boolean = false;
  fiter: boolean = false;
  constructor(
    private _commonService : commonService,
    private _companyService: companyService, 
  ) { }

  ngOnInit(): void {
    this._companyService.GetCompanies().subscribe(data =>{
      this.companyList = data["Response"]
    });
    this.customer();
    if(localStorage.getItem("UserType") == "Super Admin"){
      this.fiter = true
    }
  }

  customer(){
    if(localStorage.getItem("UserType") == "User"){
      this.user = false;
      this._commonService.GetDashUserBasedCount(localStorage.getItem("UserID"), localStorage.getItem("CompanyId")).subscribe(data =>{
        this.Users = data.Users
        this.Customers = data.Customers
        this.Document = data.Document
        this.PendingDocument = data.PendingDocument
      });
    }else if(localStorage.getItem("UserType") == "Admin" || localStorage.getItem("UserType") == "Auditor" || localStorage.getItem("UserType") == "RTO"){
      this._commonService.GetDashAdminBasedCount(localStorage.getItem("CompanyId")).subscribe(data =>{
        this.Users = data.Users
        this.Customers = data.Customers
        this.Document = data.Document
        this.PendingDocument = data.PendingDocument
      });
    } else {
      this._commonService.GetDashCount().subscribe(data =>{
        this.Users = data.Users
        this.Customers = data.Customers
        this.Document = data.Document
        this.PendingDocument = data.PendingDocument
      });
    }
  }

  filterCompanyId(cId){
    this.loader2 = true;
    if(cId == "All Company"){
      this._commonService.GetDashCount().subscribe(data =>{
        this.Users = data.Users;
        this.Customers = data.Customers;
        this.Document = data.Document;
        this.PendingDocument = data.PendingDocument;
        this.loader2 = false;
      });
    }else{
      this._commonService.GetDashAdminBasedCount(cId).subscribe(data =>{
        this.Users = data.Users;
        this.Customers = data.Customers;
        this.Document = data.Document;
        this.PendingDocument = data.PendingDocument;
        this.loader2 = false;
      });
    }
  }

}
