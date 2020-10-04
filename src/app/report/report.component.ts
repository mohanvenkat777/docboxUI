import { Component, OnInit, ViewChild } from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {MatSort} from '@angular/material/sort';
import { customerService } from "../services/customerService";
import { docketService } from "../services/docketService";
import { Router } from '@angular/router';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.scss']
})
export class ReportComponent implements OnInit {

  dataSource = new MatTableDataSource;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  docketCount: number;
  constructor(
    private _customerService:customerService,
    private router:Router,
    private _docketService: docketService
    ) { }

  ngOnInit(): void {
    this.dataSource.paginator = this.paginator;
    this.docketCountUpdate();
    this.customer();
  }
  docketCountUpdate(){
    this._docketService.GetDocketCompanyCount(localStorage.getItem("CompanyId")).subscribe(data => {
      debugger;
      this.docketCount= data
    });
  }
  customer(){
    if(localStorage.getItem("UserType") == "User"){
      this._customerService.getUserBasedCustomer(localStorage.getItem("UserID")).subscribe(data => {
        this.dataSource.data = data['Response'].reverse();
      });
    } else if(localStorage.getItem("UserType") == "Admin" || localStorage.getItem("UserType") == "Auditor"){
      this._customerService.getUserAdminCustomer(localStorage.getItem("CompanyId")).subscribe(data => {
        this.dataSource.data = data['Response'].reverse();
      });
    } else{
      this._customerService.GetCustomer().subscribe(data => {
        this.dataSource.data = data['Response'].reverse()
      })
    }
  }
  displayedColumns: string[] = ['id','cName', 'pNo', 'pending', 'completed', 'lastUpdate','updateBy'];
  edit(cID) {
    this.router.navigate(['/main/UpdateCustomer'], { queryParams: { cID: cID } });
  }
  addDocument(cID){
    this.router.navigate(['/main/AddDocument'], { queryParams: { cID: cID } });
  }
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}