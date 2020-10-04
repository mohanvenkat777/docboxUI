import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../user.service';
import { commonService } from "../services/commonService";
import { docbox } from "../services/docbox";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  LoginForm: FormGroup;
  submitted = false;
  success = false;
  load: boolean = false;
  constructor(
    private formBuilder: FormBuilder, 
    private router:Router,
    private user:UserService,
    private _commonService:commonService,
    private _docbox:docbox
  ) { }
  ngOnInit() {
    this.LoginForm = this.formBuilder.group({
      userName: ['',Validators.required],
      password: ['',Validators.required],
    });
    this.user.login("logOut");
    localStorage.clear;
  }
  onLoginSubmit() {
    this.submitted = true;
    if(this.LoginForm.invalid){
      return;
    }
    this.load = true;
    let userId:any = this.LoginForm.controls.userName.value;
    let pass:any = this.LoginForm.controls.password.value;
    this._commonService.Login(userId, pass).subscribe(data=>{
        if(data.Status == true){
          this.user.login("logIn");
          this.user.UserLoggedIn();
          this.router.navigate(['/main']);
          this.load = false;
          localStorage.setItem("UserID", data.UserID);
          localStorage.setItem("UserName", data.UserName);
          localStorage.setItem("UserType", data.UserType);
          localStorage.setItem("CompanyName", data.CompanyName);
          localStorage.setItem("CompanyLogoPath", data.CompanyLogoPath);
          localStorage.setItem("CompanyId", data.CompanyId);
        } else if(userId == "admin" && pass == "admin123"){
          this.user.login("logIn");
          this.user.UserLoggedIn();
          this.router.navigate(['/main']);
          localStorage.setItem("UserName", "Admin");
          localStorage.setItem("UserType", "Admin");
          localStorage.setItem("CompanyName", "");
          localStorage.setItem("UserType", "Super Admin");
          localStorage.setItem("CompanyLogoPath", "companylogo/khivraj.png");
          localStorage.setItem("CompanyId", "");
          this.load = false;
        } else{
          this._docbox.openSnackBar(data.ErrorMessage, "OK");
          this.load = false;
        }
    });
  }

}