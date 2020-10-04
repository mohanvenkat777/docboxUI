import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { companyService } from "../services/companyService";
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { docbox } from "../services/docbox";

@Component({
  selector: 'app-update-company',
  templateUrl: './update-company.component.html',
  styleUrls: ['./update-company.component.scss']
})
export class UpdateCompanyComponent implements OnInit {

  CarForm: FormGroup;
  submitted = false;
  success = false;
  load: boolean = false;
  disable: boolean = false;
  logoerror: boolean = false;
  Oldlogo: string;

  constructor(
    private _companyService: companyService, 
    private formBuilder: FormBuilder,
    private router:Router,
    private route: ActivatedRoute,
    private _docbox:docbox
  ) { }
  cID: string;
  ngOnInit(): void {
    this.CarForm = this.formBuilder.group({
      CompanyName: ['', Validators.required],
    });
    this.cID = this.route.snapshot.queryParamMap.get('cId');
    this._companyService.GetCompaniesData(this.cID).subscribe(cData => {
      this.CarForm.controls["CompanyName"].setValue(cData["Response"].CompanyName);
      
      this.Oldlogo = "http://docbox.khivrajcommercial.in/" + cData["Response"].CompanyLogoPath;
    });
  }

  onCarSubmit(){
    this.submitted = true;
    if(this.CarForm.invalid){
      return;
    }
    this.addData();
  }
  addData(){
   

    if(this.logo64 == ""){
     var data = {
        "Response": {
          "CompanyName": this.CarForm.controls['CompanyName'].value,
          "CompanyLogoPath": ""
        },
        "fileInput": {
          "base64String" : "",
          "docType": "",
          "fileName": "",
          "fileCategory": ""
        }
      }
    } else{
      var data = {
        "Response": {
          "CompanyName": this.CarForm.controls['CompanyName'].value,
          "CompanyLogoPath": ""
        },
        "fileInput": {
          "base64String" : this.logo64,
          "docType": this.logoType,
          "fileName": "",
          "fileCategory": ""
        }
      }
    }
    
    this.load = true;
    this.disable = true;
    
    this._companyService.updateCompany(this.cID, data).subscribe(data => {
      if(data["Status"]==true){
        this._docbox.openSnackBar("Company Updated Successfully !!", "OK");
        this.router.navigate(['/main/Company']);
        this.load = false;
        this.disable = false;
      } else{
        this._docbox.openSnackBar("Somthing Went Wrong ...", "OK");
        this.load = false;
        this.disable = false;
      }
    });
  }
  logoType: string = "";
  logo64 : string = "";
    // in app.component.ts
  files: File[] = [];
  fileData: any = [];
  onSelect(event) {
    if(this.files.length == 1){
      this.files = [];
    }
    this.files.push(...event.addedFiles);
    this.logoerror = false;
    var fileType;
    if(this.files[0].type == "image/jpeg"){
      fileType = ".jpg";
    }else if(this.files[0].type == "image/png"){
      fileType = ".png";
    }
    this.fileData = [];
    this._docbox.getBase64(this.files[0]).then(result =>{
      var baseonly = result.split('base64,');
      this.logoType = fileType;
      this.logo64 = baseonly[1];
    });
  }

  onRemove(event) {
    this.files.splice(this.files.indexOf(event), 1);
  }

  
}