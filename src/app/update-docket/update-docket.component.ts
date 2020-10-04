import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { docketService } from "../services/docketService";
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { docbox } from "../services/docbox";

@Component({
  selector: 'app-update-docket',
  templateUrl: './update-docket.component.html',
  styleUrls: ['./update-docket.component.scss']
})
export class UpdateDocketComponent implements OnInit {

  DocketForm: FormGroup;
  submitted = false;
  success = false;
  load: boolean = false;
  companyList: any;
  companyID : string;
  btnDisable: boolean = false;

  constructor(
    private _docketService: docketService, 
    private formBuilder: FormBuilder,
    private router:Router,
    private route: ActivatedRoute,
    private _docbox:docbox
  ) { }
  dID: string;
  cID: string;
  docketID: string;
  ngOnInit(): void {
    this.DocketForm = this.formBuilder.group({
      CompanyName: [{value: '', disabled: true}, Validators.required],
      DocumentName: ['', Validators.required],
      DocumentSeqNo: new FormControl('', [Validators.required, Validators.pattern("^[0-9]*$")]),
    });
    this.dID = this.route.snapshot.queryParamMap.get('dID');
    this._docketService.getDocketData(this.dID).subscribe(cData => {
      this.cID = cData["Response"].CompanyId;
      this.docketID = cData["Response"].DocketId;
      this.DocketForm.controls["CompanyName"].setValue(cData["Response"].CompanyName);
      this.DocketForm.controls["DocumentName"].setValue(cData["Response"].DocumentName);
      this.DocketForm.controls["DocumentSeqNo"].setValue(cData["Response"].DocumentSeqNo);
    });
  }

  
  onCocketSubmit(){
    this.submitted = true;
    if(this.DocketForm.invalid){
      return;
    }
    this.addData();
  }
  addData(){
    
  var data ={
    "Response": {
      "CompanyId": this.cID,
      "DocketId": this.docketID,
      "CompanyName": this.DocketForm.controls['CompanyName'].value,
      "DocumentName": this.DocketForm.controls['DocumentName'].value,
      "DocumentSeqNo": this.DocketForm.controls['DocumentSeqNo'].value,
    }
  }
  this.btnDisable = true;
  this._docketService.updateDocket(this.dID ,data).subscribe(data => {
    if(data["Status"]==true){
      this._docbox.openSnackBar("Docket Updated Successfully !!", "OK");
      this.router.navigate(['/main/Dockets']);
      this.btnDisable = false;
      } else{
        this._docbox.openSnackBar("Somthing Went Wrong ...", "OK");
        this.load = false;
        this.btnDisable = false;
      }
    });
  }

}