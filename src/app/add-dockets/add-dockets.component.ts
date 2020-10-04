import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { docketService } from "../services/docketService";
import { Router } from '@angular/router';
import { companyService } from "../services/companyService";
import { docbox } from "../services/docbox";

@Component({
  selector: 'app-add-dockets',
  templateUrl: './add-dockets.component.html',
  styleUrls: ['./add-dockets.component.scss']
})
export class AddDocketsComponent implements OnInit {

  DocketForm: FormGroup;
  submitted = false;
  success = false;
  companyList: any;
  companyID : string;
  btnDisable: boolean = false;
  

  constructor(
    private _companyService: companyService,
    private _docketService: docketService, 
    private formBuilder: FormBuilder,
    private router:Router,
    private _docbox:docbox
  ) { }

  ngOnInit(): void {
    this.DocketForm = this.formBuilder.group({
      CompanyName: ['', Validators.required],
      DocumentName: ['', Validators.required],
      DocumentSeqNo: new FormControl('', [Validators.required, Validators.pattern("^[0-9]*$")]),
    });
    this._companyService.GetCompanies().subscribe(data =>{
      this.companyList = data["Response"]
    });
    this.updateCompany();
  }
  updateCompanyId(data){
    this.companyID = data;
  }
  updateCompany(){
    if(localStorage.getItem("UserType") == "Admin"){
      this.DocketForm.controls['CompanyName'].setValue(localStorage.getItem("CompanyName"));
      this.DocketForm.controls['CompanyName'].disable();
    }
  }
  
  onCocketSubmit(){
    this.submitted = true;
    if(this.DocketForm.invalid){
      return;
    }
    this.addData();
  }
  addData(){
    if(this.companyID == "" || this.companyID == undefined || this.companyID == null){
      this.companyID = localStorage.getItem("CompanyId")
    }
  var data ={
    "Response": {
      "CompanyId": this.companyID,
      "CompanyName": this.DocketForm.controls['CompanyName'].value,
      "DocumentName": this.DocketForm.controls['DocumentName'].value,
      "DocumentSeqNo": this.DocketForm.controls['DocumentSeqNo'].value,
    }
  }
  this.btnDisable = true;
  this._docketService.addDocket(data).subscribe(data => {
    if(data["Status"]==true){
      this._docbox.openSnackBar("Docket Added Successfully !!", "OK");
      this.router.navigate(['/main/Dockets']);
      this.btnDisable = false;
      } else{
        this._docbox.openSnackBar("Somthing Went Wrong ...", "OK");
        this.btnDisable = false;
      }
    });
  }
}