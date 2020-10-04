import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { companyService } from "../services/companyService";
import { userService } from '../services/userService';
import { Router } from '@angular/router';
import { docbox } from "../services/docbox";

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss']
})
export class AddUserComponent implements OnInit {

  UserForm: FormGroup;
  submitted = false;
  success = false;
  load: boolean = false;
  disable: boolean = false;
  companyList: any;
  companyID : string;
  btnDisable: boolean = false;
  constructor(
    private _companyService: companyService, 
    private userService: userService, 
    private formBuilder: FormBuilder,
    private router:Router,
    private _docbox:docbox
  ) { }

  ngOnInit(): void {
    this.UserForm = this.formBuilder.group({
      CompanyName: ['', Validators.required],
      UserName: ['', Validators.required],
      UserPone: new FormControl('', [Validators.required, Validators.minLength(10), Validators.pattern("^[0-9]*$")]),
      UserEmail: new FormControl('', [Validators.required, Validators.email]),
      UserType: ['', Validators.required],
      UserLogin: ['', Validators.required],
      UserPassword: ['', Validators.required],
    });

    this._companyService.GetCompanies().subscribe(data =>{
      this.companyList = data["Response"]
    });
    this.updateCompany();
  }

  
  onUserSubmit(){
    this.submitted = true;
    if(this.UserForm.invalid){
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
      "CompanyName": this.UserForm.controls['CompanyName'].value,
      "UserName": this.UserForm.controls['UserName'].value,
      "UserPone": this.UserForm.controls['UserPone'].value,
      "UserEmail": this.UserForm.controls['UserEmail'].value,
      "UserType": this.UserForm.controls['UserType'].value,
      "UserLogin": this.UserForm.controls['UserLogin'].value,
      "UserPassword": this.UserForm.controls['UserPassword'].value,
    }
  }
  this.load = true;
  this.disable = true;
  this.btnDisable = true;
  console.log(data);
  this.userService.addUser(data).subscribe(data => {
    if(data["Status"]==true){
      this._docbox.openSnackBar("User Added Successfully !!", "OK");
      this.router.navigate(['/main/User']);
      this.load = false;
      this.disable = false;
      this.btnDisable = false;
      } else{
        this._docbox.openSnackBar("Somthing Went Wrong ...", "OK");
        this.load = false;
        this.disable = false;
        this.btnDisable = false;
      }
    });

  }
  updateCompanyId(data){
    this.companyID = data;
  }
  updateCompany(){
    if(localStorage.getItem("UserType") == "Admin"){
      this.UserForm.controls['CompanyName'].setValue(localStorage.getItem("CompanyName"));
      this.UserForm.controls['CompanyName'].disable();
    }
  }


  UserType: utype[] = [
    {id: '1', type: 'Admin'},
    {id: '2', type: 'User'},
    {id: '3', type: 'Auditor'},
    {id: '3', type: 'RTO'}
  ];
}


interface utype {
  id: string;
  type: string;
}
