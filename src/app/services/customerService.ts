import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { mergeMap as _observableMergeMap, catchError as _observableCatch } from 'rxjs/operators';
import { Observable, from as _observableFrom, throwError as _observableThrow, of as _observableOf } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class customerService {

  constructor(private _http : HttpClient) { }
  private url = "https://docbox.khivrajcommercial.in/api/";
  // private url = "http://localhost:51133/api/";
  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };

  // Enquiry managemennt
  public GetCustomer() : Observable<any>  {
    let url = this.url;  
    url = url.replace(/[?&]$/, "");
    const response = this._http.get(url+"Customer/GetCustomer/");
    return response;
  }
  
  // Create Company
  public addCustomer(data){
    return this._http.post(this.url+"Customer/createCustomer/",data, this.httpOptions);
  }

  public updateCustomer(id, data) : Observable<any>  {
    let url = this.url;  
    url = url.replace(/[?&]$/, "");
    const response = this._http.post(url+"Customer/updateCustomer/?id="+id ,data, this.httpOptions);
    return response;
  }
  
  public getCustomerData(Id) : Observable<any>  {
    let url = this.url;  
    url = url.replace(/[?&]$/, "");
    const response = this._http.get(url+"Customer/GetCustomer?cId="+Id);
    return response;
  }

  // Car Details
  public getCustomerData2(cId) : Observable<any>  {
    let url = this.url;  
    url = url.replace(/[?&]$/, "");
    const response = this._http.get(url+"Customer/GetCustomer?customerId="+cId);
    return response;
  }



  // User Based
  public getUserBasedCustomer(userId) : Observable<any>  {
    let url = this.url;  
    url = url.replace(/[?&]$/, "");
    const response = this._http.get(url+"Customer/getUserBasedCustomer?userId="+userId);
    return response;
  }

  // Admin Based
  public getUserAdminCustomer(companyId) : Observable<any>  {
    let url = this.url;  
    url = url.replace(/[?&]$/, "");
    const response = this._http.get(url+"Customer/getAdminBasedCustomer?companyId="+companyId);
    return response;
  }
  
  
}