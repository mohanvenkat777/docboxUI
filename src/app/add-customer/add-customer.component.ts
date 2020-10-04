import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { customerService } from "../services/customerService";
import { Router } from '@angular/router';
import { docbox } from "../services/docbox";

@Component({
  selector: 'app-add-customer',
  templateUrl: './add-customer.component.html',
  styleUrls: ['./add-customer.component.scss']
})
export class AddCustomerComponent implements OnInit {

  CustomerForm: FormGroup;
  submitted = false;
  success = false;
  companyList: any;
  companyID: string;
  btnDisable: boolean = false;
  cYear: any;
  cMonth: any;
  constructor(
    private _customerService: customerService,
    private formBuilder: FormBuilder,
    private router: Router,
    private _docbox: docbox
  ) { }

  ngOnInit(): void {
    this.CustomerForm = this.formBuilder.group({
      CustomerName: ['', Validators.required],
      CustomerPone: new FormControl('', [Validators.required, Validators.pattern("^[0-9]*$")]),
      CustomerRef: ['', Validators.required],
    });
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

  onCustomerSubmit() {
    this.submitted = true;
    if (this.CustomerForm.invalid) {
      return;
    }
    this.addData();
  }
  addData() {
    var data = {
      "Response": {
        "CustomerName": this.CustomerForm.controls['CustomerName'].value,
        "CustomerPone": this.CustomerForm.controls['CustomerPone'].value,
        "CustomerRef": this.CustomerForm.controls['CustomerRef'].value,
        "CompanyId": localStorage.getItem("CompanyId"),
        "UserID": localStorage.getItem("UserID"),
        "cYear": this.cYear,
        "cMonth": this.cMonth,
      }
    }
    this.btnDisable = true;
    this._customerService.addCustomer(data).subscribe(data => {
      if (data["Status"] == true) {
        this._docbox.openSnackBar("Customer Added Successfully !!", "OK");
        this.router.navigate(['/main/Customer']);
        this.btnDisable = false;
      } else {
        this._docbox.openSnackBar(data["ErrorMessage"], "OK");
        this.btnDisable = false;
      }
    });
  }

}