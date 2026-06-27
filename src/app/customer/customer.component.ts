import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { customerService } from '../services/customerService';
import { Router } from '@angular/router';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.scss']
})
export class CustomerComponent implements OnInit, AfterViewInit {

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  customers: any[] = [];
  totalRecords = 0;
  pageSize = 50;
  isLoading = false;

  displayedColumns: string[] = ['id', 'name', 'ref', 'phone', 'date', 'edit', 'add'];

  constructor(
    private _customerService: customerService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.loadCustomers(1, this.pageSize);
  }

  ngAfterViewInit(): void {
    this.paginator.page.subscribe(() => {
      this.loadCustomers(this.paginator.pageIndex + 1, this.paginator.pageSize);
    });
  }

  loadCustomers(page: number, pageSize: number) {
    this.isLoading = true;
    const userType = localStorage.getItem('UserType');

    if (userType === 'User') {
      this._customerService
        .getUserBasedCustomer(localStorage.getItem('UserID'), page, pageSize)
        .subscribe(data => this.handleResponse(data));
    } else if (userType === 'Admin' || userType === 'Auditor' || userType === 'RTO') {
      this._customerService
        .getUserAdminCustomer(localStorage.getItem('CompanyId'), page, pageSize)
        .subscribe(data => this.handleResponse(data));
    } else {
      this._customerService
        .GetCustomer(page, pageSize)
        .subscribe(data => this.handleResponse(data));
    }
  }

  handleResponse(data: any) {
    this.customers = data['Response'] || [];
    this.totalRecords = data['Total'] || 0;
    this.paginator.length = this.totalRecords;
    this.isLoading = false;
  }

  currentOffset(): number {
    return this.paginator.pageIndex * this.paginator.pageSize;
  }

  edit(cID: any) {
    this.router.navigate(['/main/UpdateCustomer'], { queryParams: { cID: cID } });
  }

  addDocument(cID: any) {
    this.router.navigate(['/main/AddDocument'], { queryParams: { cID: cID } });
  }
}
