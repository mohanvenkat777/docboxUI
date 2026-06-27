import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { customerService } from "../services/customerService";
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { docbox } from "../services/docbox";

@Component({
  selector: 'app-update-customer',
  templateUrl: './update-customer.component.html',
  styleUrls: ['./update-customer.component.scss']
})
export class UpdateCustomerComponent implements OnInit {

  CustomerForm: FormGroup;
  submitted = false;
  success = false;
  load: boolean = false;
  disable: boolean = false;
  companyList: any;
  companyID : string;

  constructor(
    private _customerService: customerService, 
    private formBuilder: FormBuilder,
    private router:Router,
    private route: ActivatedRoute,
    private _docbox:docbox
  ) { }
  cID: string;
  ngOnInit(): void {
    this.CustomerForm = this.formBuilder.group({
      CustomerName: ['', Validators.required],
      CustomerPone: new FormControl('', [Validators.required]),
      CustomerRef: ['', Validators.required],
    });
    this.cID = this.route.snapshot.queryParamMap.get('cID');
    console.log('[UpdateCustomer] cID from route:', this.cID);
    this._customerService.getCustomerData(this.cID).subscribe(
      cData => {
        console.log('[UpdateCustomer] API response:', cData);
        const r = cData['Response'];
        if (!r) { console.error('[UpdateCustomer] Response is null/undefined'); return; }
        this.CustomerForm.patchValue({
          CustomerName: r.CustomerName,
          CustomerPone: r.CustomerPone,
          CustomerRef:  r.CustomerRef,
        });
        console.log('[UpdateCustomer] Form values after patch:', this.CustomerForm.value);
      },
      err => console.error('[UpdateCustomer] HTTP error:', err)
    );
  }

  onCustomerSubmit(){
    this.submitted = true;
    if(this.CustomerForm.invalid){
      return;
    }
    this.addData();
  }
  addData(){  
  var data ={
    "Response": {
      "CustomerName": this.CustomerForm.controls['CustomerName'].value,
      "CustomerPone": this.CustomerForm.controls['CustomerPone'].value,
      "CustomerRef": this.CustomerForm.controls['CustomerRef'].value,
      "CompanyId": localStorage.getItem("CompanyId"),
    }
  }
  this.load = true;
  this.disable = true;
  this._customerService.updateCustomer(this.cID, data).subscribe(data => {
    if(data["Status"]==true){
      this._docbox.openSnackBar("Customer Updated Successfully !!", "OK");
      this.router.navigate(['/main/Customer']);
      this.load = false;
      this.disable = false;
      } else{
        this._docbox.openSnackBar("Somthing Went Wrong ...", "OK");
        this.load = false;
        this.disable = false;
      }
    });
  }


}