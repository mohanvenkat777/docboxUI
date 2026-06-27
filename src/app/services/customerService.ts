import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { mergeMap as _observableMergeMap, catchError as _observableCatch } from 'rxjs/operators';
import { Observable, from as _observableFrom, throwError as _observableThrow, of as _observableOf } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class customerService {

  constructor(private _http : HttpClient) { }
  private url = "http://localhost:3000/api/";
  // private url = "https://docbox.khivrajcommercial.in/api/";
  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };

  public GetCustomer(page: number = 1, pageSize: number = 50) : Observable<any>  {
    return this._http.get(this.url + `Customer/GetCustomer?page=${page}&pageSize=${pageSize}`);
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
  public getUserBasedCustomer(userId, page: number = 1, pageSize: number = 50) : Observable<any>  {
    return this._http.get(this.url + `Customer/getUserBasedCustomer?userId=${userId}&page=${page}&pageSize=${pageSize}`);
  }

  // Admin Based
  public getUserAdminCustomer(companyId, page: number = 1, pageSize: number = 50) : Observable<any>  {
    return this._http.get(this.url + `Customer/getAdminBasedCustomer?companyId=${companyId}&page=${page}&pageSize=${pageSize}`);
  }
  
  
}