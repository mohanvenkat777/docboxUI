import { Component, OnInit, ViewChild } from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {MatSort} from '@angular/material/sort';
import { companyService } from "../services/companyService";
import { Router } from '@angular/router';

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.scss']
})
export class CompanyComponent implements OnInit {

  dataSource = new MatTableDataSource;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(
    private _companyService:companyService,
    private router:Router 
    ) { }

  ngOnInit(): void {
    this.dataSource.paginator = this.paginator;
    this._companyService.GetCompanies().subscribe(data => {
      this.dataSource.data = data['Response'].reverse()
    })
  }
  displayedColumns: string[] = ['id','CompanyName', 'edit'];
  edit(companyID) {
    this.router.navigate(['/main/UpdateCompany'], { queryParams: { cId: companyID } });
  }
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}