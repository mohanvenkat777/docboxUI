import { Component, ViewChild,ElementRef, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { doumentService } from "../services/documentService";
import { customerService } from "../services/customerService";
import { Router } from '@angular/router';
import { docbox } from "../services/docbox";

@Component({
  selector: 'app-view-document',
  templateUrl: './view-document.component.html',
  styleUrls: ['./view-document.component.scss']
})
export class ViewDocumentComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private _doumentService: doumentService,
    private _customerService: customerService,
    private router:Router,
    private _docbox:docbox 
  ) { }

  cID: string;
  dID: string;
  documentData: any;
  CustomerName: string;
  CustomerRef: string;
  dName: string;
  currentDate: string;

  ngOnInit(): void {
    this.cID = this.route.snapshot.queryParamMap.get('cID');
    this.dID = this.route.snapshot.queryParamMap.get('dID');
    this.dName = this.route.snapshot.queryParamMap.get('dName');
    this._doumentService.getDocumentDetail(this.cID, this.dID).subscribe(cData => {
        this.documentData = cData["Response"];
    });
    this._customerService.getCustomerData2(this.cID).subscribe(cData => {
      this.CustomerName = cData["Response"].CustomerName;
      this.CustomerRef = cData["Response"].CustomerRef;
    });
    this.currentDate = this._docbox.getDateTime();
  }
  back(){
    this.router.navigate(['/main/AddDocument'], { queryParams: { cID: this.cID } });
  }
  
  Base64String: string;
  DocumentType: string;
  loader2: boolean;
  Id : number;
  documentPath : string;
  documentName : string;
  updateDocketID(Id, path){
    this.Id = Id;
    var p = path.split(".");
    var pp = (p[0]).split("/");
    var finalpath="";
    for(var i=0; i<(pp.length)-1; i++){
      finalpath+= pp[i]+"/"
    }
    this.documentPath = finalpath;
    this.documentName = pp[pp.length-1];

  }
  @ViewChild('customerFiled', {static: false}) customerFiled: ElementRef;
  onUpload(file){
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
        "CustomerID": "",
        "DocumentType": this.DocumentType,
        "CompanyId": "",
        "UserID": "",
        "UploadedBy": localStorage.getItem("UserName"),
      },
      "Base64String": this.Base64String,
      "LastUpdate": this.currentDate,
      "UpdatedBy": localStorage.getItem("UserName"),
    }
    this.documentData = [];
    this._doumentService.updateDocument(data, this.Id, this.documentPath, this.documentName).subscribe(data => {
      if(data["Status"]==true){
        this._doumentService.getDocumentDetail(this.cID, this.dID).subscribe(cData => {
            this.documentData = cData["Response"];
            this._docbox.openSnackBar("Document Updated Successfuly", "OK");
            this.loader2 = false;
            location.reload();
        });
        } else{
          this._docbox.openSnackBar("Somthing Went Wrong ...", "OK");
          this.loader2 = false;
        }
    });
  }
}
