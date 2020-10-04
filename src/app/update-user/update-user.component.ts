import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { companyService } from "../services/companyService";
import { userService } from "../services/userService";
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { docbox } from "../services/docbox";

@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.scss']
})
export class UpdateUserComponent implements OnInit {

  UserForm: FormGroup;
  submitted = false;
  success = false;
  load: boolean = false;
  disable: boolean = false;
  companyList: any;
  companyID : string;

  constructor(
    private _companyService: companyService, 
    private userService: userService, 
    private formBuilder: FormBuilder,
    private router:Router,
    private route: ActivatedRoute,
    private _docbox:docbox
  ) { }
  uID: string;
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
    this.uID = this.route.snapshot.queryParamMap.get('uId');
    this.userService.getUserData(this.uID).subscribe(cData => {
      this.UserForm.controls["CompanyName"].setValue(cData["Response"].CompanyName);
      this.UserForm.controls["UserName"].setValue(cData["Response"].UserName);
      this.UserForm.controls["UserPone"].setValue(cData["Response"].UserPone);
      this.UserForm.controls["UserEmail"].setValue(cData["Response"].UserEmail);
      this.UserForm.controls["UserType"].setValue(cData["Response"].UserType);
      this.UserForm.controls["UserLogin"].setValue(cData["Response"].UserLogin);
      this.UserForm.controls["UserPassword"].setValue(cData["Response"].UserPassword);
    });
  }

  
  onUserSubmit(){
    this.submitted = true;
    if(this.UserForm.invalid){
      return;
    }
    this.addData();
  }
  addData(){
    
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
  console.log(data);
  this.userService.updateUser(this.uID, data).subscribe(data => {
    if(data["Status"]==true){
      this._docbox.openSnackBar("User Updated Successfully !!", "OK");
      this.router.navigate(['/main/User']);
      this.load = false;
      this.disable = false;
      } else{
        this._docbox.openSnackBar("Somthing Went Wrong ...", "OK");
        this.load = false;
        this.disable = false;
      }
    });

  }
  updateCompanyId(data){
    this.companyID = data;
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
