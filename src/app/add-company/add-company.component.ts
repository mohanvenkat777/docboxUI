import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { companyService } from "../services/companyService";
import { Router } from '@angular/router';
import { docbox } from "../services/docbox";

@Component({
  selector: 'app-add-company',
  templateUrl: './add-company.component.html',
  styleUrls: ['./add-company.component.scss']
})
export class AddCompanyComponent implements OnInit {

  companyForm: FormGroup;
  submitted = false;
  logoerror: boolean = false;
  btnDisable: boolean = false;
  logoType: string;
  logo64: string;
  files: File[] = [];
  fileData: any = [];

  constructor(
    private _companyService: companyService,
    private formBuilder: FormBuilder,
    private router: Router,
    private _docbox: docbox
  ) { }

  ngOnInit(): void {
    this.companyForm = this.formBuilder.group({
      CompanyName: ['', Validators.required],
    });
  }

  onCompanySubmit() {
    this.submitted = true;
    if (this.companyForm.invalid) {
      return;
    }
    this.addData();
  }
  addData() {
    if (this.files.length == 0) {
      this.logoerror = true;
      return;
    }

    var data = {
      "Response": {
        "CompanyName": this.companyForm.controls['CompanyName'].value,
        "CompanyLogoPath": ""
      },
      "fileInput": {
        "base64String": this.logo64,
        "docType": this.logoType,
        "fileName": "",
        "fileCategory": ""
      }
    }
    this.btnDisable = true;
    this._companyService.addCompany(data).subscribe(data => {
      if (data["Status"] == true) {
        this._docbox.openSnackBar("Company Added Successfully !!", "OK");
        this.router.navigate(['/main/Company']);
        this.btnDisable = false;
      } else {
        this._docbox.openSnackBar("Somthing Went Wrong ...", "OK");
        this.btnDisable = false;
      }
    });

  }
  onSelect(event) {
    if (this.files.length == 1) {
      this.files = [];
    }
    this.files.push(...event.addedFiles);
    this.logoerror = false;
    var fileType;
    if (this.files[0].type == "image/jpeg") {
      fileType = ".jpg";
    } else if (this.files[0].type == "image/png") {
      fileType = ".png";
    }
    this.fileData = [];
    this._docbox.getBase64(this.files[0]).then(result => {
      var baseonly = result.split('base64,');
      this.logoType = fileType;
      this.logo64 = baseonly[1];
    });
  }
  onRemove(event) {
    this.files.splice(this.files.indexOf(event), 1);
  }


}
