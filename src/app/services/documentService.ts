import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { mergeMap as _observableMergeMap, catchError as _observableCatch } from 'rxjs/operators';
import { Observable, from as _observableFrom, throwError as _observableThrow, of as _observableOf } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class doumentService {

  constructor(private _http : HttpClient) { }
  private url = "http://localhost:3000/api/";
  // private url = "https://docbox.khivrajcommercial.in/api/";
  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };

  
  
  // Create Company
  public createDocument(data){
    return this._http.post(this.url+"Document/CreateDocument/",data, this.httpOptions);
  }
  public updateDocument(data, Id, path, documentName){
    return this._http.post(this.url+"Document/UpdateDocument?Id="+Id+"&path="+path+"&documentName="+documentName,data, this.httpOptions);
  }

  
  // Car Details
  public getDocumentDetail(cId, dId) : Observable<any>  {
    let url = this.url;  
    url = url.replace(/[?&]$/, "");
    const response = this._http.get(url+"Document/getDocument?cId="+cId+"&dId="+dId);
    return response;
  }
}