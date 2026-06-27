import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { mergeMap as _observableMergeMap, catchError as _observableCatch } from 'rxjs/operators';
import { Observable, from as _observableFrom, throwError as _observableThrow, of as _observableOf } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class customerDocumentService {

  constructor(private _http : HttpClient) { }
  private url = "http://68.178.174.88/api/";
  // private url = "https://docbox.khivrajcommercial.in/api/";
  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };

  

  public getCustomerDocumentData(cId) : Observable<any>  {
    let url = this.url;  
    url = url.replace(/[?&]$/, "");
    const response = this._http.get(url+"CustomerData/getCustomerDocument?cId="+cId);
    return response;
  }

  public UpdateCompleted(data){
    return this._http.post(this.url+"CustomerData/UpdateCompleted/",data, this.httpOptions);
  }
  
  
}
