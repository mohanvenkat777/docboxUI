import { Component, OnInit, ViewChild } from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {MatSort} from '@angular/material/sort';
import { docketService } from "../services/docketService";
import { Router } from '@angular/router';

@Component({
  selector: 'app-dockets',
  templateUrl: './dockets.component.html',
  styleUrls: ['./dockets.component.scss']
})
export class DocketsComponent implements OnInit {
  dataSource = new MatTableDataSource;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(
    private _docketService:docketService,
    private router:Router,
    ) { }

  ngOnInit(): void {
    this.dataSource.paginator = this.paginator;
    
    this.user();
  }
  user(){
    if(localStorage.getItem("UserType") == "Admin"){
      this._docketService.getDocketCompanyData(localStorage.getItem("CompanyId")).subscribe(data => {
        this.dataSource.data = data['Response'].reverse()
      });
    } else{
      this._docketService.GetDocket().subscribe(data => {
        this.dataSource.data = data['Response'].reverse()
      });
    }
  }
  displayedColumns: string[] = ['id','companyName', 'name', 'seq', 'edit'];
  edit(dID) {
    this.router.navigate(['/main/UpdateDocket'], { queryParams: { dID: dID } });
  }
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}