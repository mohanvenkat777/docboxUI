import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { mergeMap as _observableMergeMap, catchError as _observableCatch } from 'rxjs/operators';
import { Observable, from as _observableFrom, throwError as _observableThrow, of as _observableOf } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class companyService {

  constructor(private _http : HttpClient) { }
  private url = "https://docbox.khivrajcommercial.in/api/";
  // private url = "http://localhost:51133/api/";
  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };

  // Enquiry managemennt
  public GetCompanies() : Observable<any>  {
    let url = this.url;  
    url = url.replace(/[?&]$/, "");
    const response = this._http.get(url+"Company/getCommpany/");
    return response;
  }
  
  // Create Company
  public addCompany(data){
    return this._http.post(this.url+"Company/createCompany/",data, this.httpOptions);
  }

  public updateCompany(id, data) : Observable<any>  {
    let url = this.url;  
    url = url.replace(/[?&]$/, "");
    const response = this._http.post(url+"Company/updateCompany/?cId="+id ,data, this.httpOptions);
    return response;
  }
  
  // Car Details
  public GetCompaniesData(cID) : Observable<any>  {
    let url = this.url;  
    url = url.replace(/[?&]$/, "");
    const response = this._http.get(url+"Company/getCommpany?cId="+cID);
    return response;
  }
  
  
}