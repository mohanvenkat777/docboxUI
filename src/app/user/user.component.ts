import { Component, OnInit, ViewChild } from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {MatSort} from '@angular/material/sort';
import { companyService } from "../services/companyService";
import { userService } from "../services/userService";
import { Router } from '@angular/router';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  dataSource = new MatTableDataSource;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(
    private _companyService:companyService,
    private router:Router,
    private _userService: userService
    ) { }

  ngOnInit(): void {
    this.dataSource.paginator = this.paginator;
    this.user();
  }
  displayedColumns: string[] = ['id','company', 'name', 'phone', 'email', 'type', 'edit'];
  edit(userID) {
    this.router.navigate(['/main/UpdateUser'], { queryParams: { uId: userID } });
  }
  user(){
    if(localStorage.getItem("UserType") == "Admin" || localStorage.getItem("UserType") == "Auditor"){
      this._userService.getCompanyBasedUserData(localStorage.getItem("CompanyId")).subscribe(data => {
        this.dataSource.data = data['Response'].reverse()
      })
    } else{
      this._userService.GetUser().subscribe(data => {
        this.dataSource.data = data['Response'].reverse()
      })
    }
  }
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}
