import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { mergeMap as _observableMergeMap, catchError as _observableCatch } from 'rxjs/operators';
import { Observable, from as _observableFrom, throwError as _observableThrow, of as _observableOf } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class commonService {
  constructor(private _http : HttpClient) { }
  private url = "http://localhost:3000/api/";
  // private url = "https://docbox.khivrajcommercial.in/api/";
  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };
  public Login(id,pass) : Observable<any>  {
    let url = this.url;
    url = url.replace(/[?&]$/, "");
    const response = this._http.get(url+"Login/CheckLogin?user="+id+"&pass="+pass);
    return response;
  }
  public GetDashCount() : Observable<any>  {
    let url = this.url;
    url = url.replace(/[?&]$/, "");
    const response = this._http.get(url+"Dashboard/GetCounts/");
    return response;
  }
  public GetDashUserBasedCount(uId, cId) : Observable<any>  {
    let url = this.url;
    url = url.replace(/[?&]$/, "");
    const response = this._http.get(url+"Dashboard/GetCounts?uId="+uId+"&cId="+cId);
    return response;
  }
  public GetDashAdminBasedCount(data) : Observable<any>  {
    let url = this.url;
    url = url.replace(/[?&]$/, "");
    const response = this._http.get(url+"Dashboard/GetAdminCounts?cId="+data);
    return response;
  }

}