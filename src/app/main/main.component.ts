import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  UserType: string;
  constructor(
    private router: Router, 
    private user:UserService, 
    ) { }
  logopath = "https://docbox.khivrajcommercial.in/" + localStorage.getItem("CompanyLogoPath");
  username = localStorage.getItem("UserName");
  ngOnInit(): void {
    this.UserType = localStorage.getItem("UserType");
  }
  goToLogin(){
    this.user.login("logOut");
      this.user.UserLoggedIn();
      this.router.navigate(['Login']); 
      localStorage.clear;  
  }
  year: any = new Date().getFullYear();

  toggle: boolean = false;
  toggleClasses() {
    let toggleStatus = {
      mainToggled: this.toggle,
    };
    return toggleStatus;
  }

  enableToggle(){
    if(this.toggle == false){
      this.toggle = true;
    } else{
      this.toggle = false;
    }
  }
  mbCloseNav(){
    if(window.innerWidth < 767){
      if(this.toggle == false){
        this.toggle = true;
      } else{
        this.toggle = false;
      }
    }
  }
}
