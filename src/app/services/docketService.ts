import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { mergeMap as _observableMergeMap, catchError as _observableCatch } from 'rxjs/operators';
import { Observable, from as _observableFrom, throwError as _observableThrow, of as _observableOf } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class docketService {

  constructor(private _http : HttpClient) { }
  private url = "http://localhost:3000/api/";
  // private url = "https://docbox.khivrajcommercial.in/api/";
  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };

  // Enquiry managemennt
  public GetDocket() : Observable<any>  {
    let url = this.url;  
    url = url.replace(/[?&]$/, "");
    const response = this._http.get(url+"Docket/GetDocket/");
    return response;
  }
  // Enquiry managemennt
  public GetDocketCount() : Observable<any>  {
    let url = this.url;  
    url = url.replace(/[?&]$/, "");
    const response = this._http.get(url+"Docket/GetDocketCount/");
    return response;
  }
  
  
  // Create Company
  public addDocket(data){
    return this._http.post(this.url+"Docket/CreateDocket/",data, this.httpOptions);
  }

  public updateDocket(id, data) : Observable<any>  {
    let url = this.url;  
    url = url.replace(/[?&]$/, "");
    const response = this._http.post(url+"Docket/updateDocket?id="+id ,data, this.httpOptions);
    return response;
  }
  
  public getDocketData(Id) : Observable<any>  {
    let url = this.url;  
    url = url.replace(/[?&]$/, "");
    const response = this._http.get(url+"Docket/getDocket?Id="+Id);
    return response;
  }

  public getDocketCompanyData(CId) : Observable<any>  {
    let url = this.url;  
    url = url.replace(/[?&]$/, "");
    const response = this._http.get(url+"Docket/getDocket?cId="+CId);
    return response;
  }

  public GetDocketCompanyCount(cId) : Observable<any>  {
    let url = this.url;  
    url = url.replace(/[?&]$/, "");
    const response = this._http.get(url+"Docket/GetDocketCompanyCount?cId="+cId);
    return response;
  }
  
  
}