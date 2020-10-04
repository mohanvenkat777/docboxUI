import { Component, OnInit, ViewChild } from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {MatSort} from '@angular/material/sort';
import { customerService } from "../services/customerService";
import { Router } from '@angular/router';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.scss']
})
export class CustomerComponent implements OnInit {

  dataSource = new MatTableDataSource;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(
    private _customerService:customerService,
    private router:Router,
    ) { }

  ngOnInit(): void {
    this.dataSource.paginator = this.paginator;
    this.customer();
  }


  customer(){
    if(localStorage.getItem("UserType") == "User"){
      this._customerService.getUserBasedCustomer(localStorage.getItem("UserID")).subscribe(data => {
        this.dataSource.data = data['Response'].reverse();
        console.log(this.dataSource.data.length);
      });
    } else if(localStorage.getItem("UserType") == "Admin" || localStorage.getItem("UserType") == "Auditor" || localStorage.getItem("UserType") == "RTO"){
      this._customerService.getUserAdminCustomer(localStorage.getItem("CompanyId")).subscribe(data => {
        this.dataSource.data = data['Response'].reverse();
      });
    } else{
      this._customerService.GetCustomer().subscribe(data => {
        this.dataSource.data = data['Response'].reverse()
      })
    }
  }
  displayedColumns: string[] = ['id','name', 'ref', 'phone', "date", 'edit','add'];
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
