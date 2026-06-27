import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { mergeMap as _observableMergeMap, catchError as _observableCatch } from 'rxjs/operators';
import { Observable, from as _observableFrom, throwError as _observableThrow, of as _observableOf } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class userService {

  constructor(private _http : HttpClient) { }
  private url = "http://68.178.174.88/api/";
  // private url = "https://docbox.khivrajcommercial.in/api/";
  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };

  // Enquiry managemennt
  public GetUser() : Observable<any>  {
    let url = this.url;  
    url = url.replace(/[?&]$/, "");
    const response = this._http.get(url+"User/GetUser/");
    return response;
  }
  
  // Create Company
  public addUser(data){
    return this._http.post(this.url+"User/createUser/",data, this.httpOptions);
  }

  public updateUser(id, data) : Observable<any>  {
    let url = this.url;  
    url = url.replace(/[?&]$/, "");
    const response = this._http.post(url+"User/updateUser/?id="+id ,data, this.httpOptions);
    return response;
  }
  
  // Car Details
  public getUserData(cID) : Observable<any>  {
    let url = this.url;  
    url = url.replace(/[?&]$/, "");
    const response = this._http.get(url+"User/getUser?uId="+cID);
    return response;
  }
  // Car Details
  public getCompanyBasedUserData(cID) : Observable<any>  {
    let url = this.url;  
    url = url.replace(/[?&]$/, "");
    const response = this._http.get(url+"User/getUser?cId="+cID);
    return response;
  }
  
  
}
