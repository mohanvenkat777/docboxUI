import { Component, ViewChild,ElementRef, OnInit } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { customerService } from "../services/customerService";
import { doumentService } from "../services/documentService";
import { customerDocumentService } from "../services/customerDocumentService";
import { Router } from '@angular/router';
import { docbox } from "../services/docbox";


@Component({
  selector: 'app-add-document',
  templateUrl: './add-document.component.html',
  styleUrls: ['./add-document.component.scss']
})
export class AddDocumentComponent implements OnInit {

  name: string;
  CustomerName: string;
  CustomerRef: string;
  UserID: string;
  loader2: boolean;
  currentDate: string;
  docketID : number;
  cYear: any;
  cYear2: any;
  cMonth: any;
  cMonth2: any;
  constructor(
    public dialog: MatDialog,
    private route: ActivatedRoute,
    private _customerService: customerService,
    private _customerDocumentService: customerDocumentService,
    private _doumentService: doumentService,
    private router:Router,
    private _docbox:docbox
  ) {}
  cID: string;
  cDocData: any;
  ngOnInit(): void {
    this.cID = this.route.snapshot.queryParamMap.get('cID');
    this._customerService.getCustomerData2(this.cID).subscribe(cData => {
      this.CustomerName = cData["Response"].CustomerName;
      this.CustomerRef = cData["Response"].CustomerRef;
      this.UserID = cData["Response"].UserID;

      this.cYear2 = cData["Response"].cYear;
      this.cMonth2 = cData["Response"].cMonth;
    });
    this._customerDocumentService.getCustomerDocumentData(this.cID).subscribe(cData => {
      this.cDocData = cData["Response"];
      this.cDocData.sort(function(a, b){
        return a["DocumentSeqNo"] -b ["DocumentSeqNo"]
      });
    });
    this.currentDate = this._docbox.getDateTime();
    this.updateDateYear();
  }

  updateDateYear(){
    var date = new Date();
    this.cYear = date.getFullYear();
    var month = date.getMonth() + 1;
    if(month == 1){this.cMonth = "January"}
    else if(month == 2){ this.cMonth = "February" }
    else if(month == 3){ this.cMonth = "March" }
    else if(month == 4){ this.cMonth = "April" }
    else if(month == 5){ this.cMonth = "May" }
    else if(month == 6){ this.cMonth = "June" }
    else if(month == 7){ this.cMonth = "July" }
    else if(month == 8){ this.cMonth = "August" }
    else if(month == 9){ this.cMonth = "September" }
    else if(month == 10){ this.cMonth = "October" }
    else if(month == 11){ this.cMonth = "November" }
    else if(month == 12){ this.cMonth = "December" }
  }

  isCom(IsCompletd, DocketId){
    this.loader2 = true;
    if(IsCompletd == "No"){
      IsCompletd = "Yes"
    }else{
      IsCompletd = "No"
    }
    var data ={
      "Response": {
        "DocketId": DocketId,
        "CustomerID": this.cID,
        "IsCompletd": IsCompletd,
        "CompanyId": localStorage.getItem("CompanyId"),
        "UserID": this.UserID,
      }
    }
    this._customerDocumentService.UpdateCompleted(data).subscribe(cData => {
      this._customerDocumentService.getCustomerDocumentData(this.cID).subscribe(cData => {
        this.cDocData = cData["Response"];
        this.cDocData.sort(function(a, b){
          return a["DocumentSeqNo"] -b ["DocumentSeqNo"]
        });
        this._docbox.openSnackBar("Request Updated", "OK");
        this.loader2 = false;
      });
    });
  }
  viewDocument(dID, ScaneCount, dName){
      if(ScaneCount == 0){
        this._docbox.openSnackBar("No Document Uploaded for This Document Type", "OK");
      } else {
        this.router.navigate(['/main/ViewDocument'], { queryParams: { cID: this.cID, dID: dID, dName: dName } });
      }
  }
  documentCategory: string;
  updateDocketID(did, cat){
    this.docketID = did;
    this.documentCategory = cat;
  }
  Base64String: string;
  DocumentType: string;
  file: string;
  @ViewChild('customerFiled', {static: false}) customerFiled: ElementRef;

  onUpload(file){
    debugger;
    var fileType;
    if(file[0].type == "image/jpeg"){
      fileType = ".jpg";
    } else if(file[0].type == "image/png"){
      fileType = ".png";
    } else if(file[0].type == "application/pdf") {
      fileType = ".pdf";
    }

    
    var fileSize = file[0].size / 1024 / 1024;
    if(fileSize > 1){
      this._docbox.openSnackBar("The file size can not exceed 1MB.", "OK");
      this.customerFiled.nativeElement.value = ""; 
    }else{
      if(file[0].type)
        this._docbox.getBase64(file[0]).then(result =>{
          var baseonly = result.split('base64,');
          this.Base64String = baseonly[1];
          this.DocumentType = fileType;
          this.addDocument();
      });
    }
    
  }
  addDocument(){
    this.loader2 = true;
    var data ={
      "Response": {
        "CustomerID": this.cID,
        "DocketId": this.docketID,
        "DocumentType": this.DocumentType,
        "CompanyId": localStorage.getItem("CompanyId"),
        "UserID": localStorage.getItem("UserID"),

      },
      "Base64String": this.Base64String,
      "companyName": localStorage.getItem("CompanyName"),
      "customerName": this.CustomerName,
      "documentCategory": this.documentCategory,
      "YearMonth": this.cMonth2 + "-" + this.cYear2,
      "LastUpdate": this.currentDate,
      "UpdatedBy": localStorage.getItem("UserName"),
    }
    this._doumentService.createDocument(data).subscribe(data => {
      if(data["Status"]==true){
          this._customerDocumentService.getCustomerDocumentData(this.cID).subscribe(cData => {
            
            this.cDocData = cData["Response"];
            this.cDocData.sort(function(a, b){
              return a["DocumentSeqNo"] -b ["DocumentSeqNo"]
            });
            this._docbox.openSnackBar("Document Updated Successfuly", "OK");
            this.loader2 = false;
          });
        } else{
          this._docbox.openSnackBar("Somthing Went Wrong ...", "OK");
          this.loader2 = false;
        }
    });
  }
}

