import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { SharedApiService } from 'src/app/shared/services/shared-api.service';
import { Router } from '@angular/router';

import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-sales',
  templateUrl: './sales.component.html',
  styleUrls: ['./sales.component.scss'],
})
export class SalesComponent implements OnInit, AfterViewInit {
  salesData!: any;
  showSpinner: boolean = false;

  dataSource!: MatTableDataSource<any>;
  displayedColumns: string[] = [
    'invoiceNumber',
    'date',
    'saleId',
    'lead',
    'branchName',
    'employeeName',
    'price',
    'actions',
  ];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private sharedAPI: SharedApiService, private router: Router) {}

  ngOnInit() {
    this.getSalesData();
  }

  getSalesData() {
    this.sharedAPI.getSales().subscribe((response) => {
      this.salesData = response.salesData;
      this.dataSource = new MatTableDataSource(this.salesData);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  navCreateSale() {
    const currentroute = this.router.url;
    if (currentroute.toString().includes('admin')) {
      this.router.navigate(['admin/sales-create']);
    } else {
      this.router.navigate(['sales-create']);
    }
  }

  navEditSale(_id: string) {
    const currentroute = this.router.url;
    if (currentroute.toString().includes('admin')) {
      this.router.navigate(['admin/sales-edit'], { queryParams: { _id } });
    } else {
      this.router.navigate(['sales-edit'], { queryParams: { _id } });
    }
  }
  navViewSale(_id: string) {
    const currentroute = this.router.url;
    if (currentroute.toString().includes('admin')) {
      this.router.navigate(['admin/sales-view'], { queryParams: { _id } });
    } else {
      this.router.navigate(['sales-view'], { queryParams: { _id } });
    }
  }

  deleteSale(_id: string) {
    Swal.fire({
      title: 'Confirmation',
      text: `Are you sure to delete the Sale?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33  ',
      confirmButtonText: 'Yes',
    }).then((result) => {
      if (result.isConfirmed) {
        this.showSpinner = true;
        this.sharedAPI.deleteSale(_id).subscribe((response) => {
          if (response.status == 'OK') {
            this.showSpinner = false;

            Swal.fire({
              position: 'center',
              icon: 'success',
              title: 'Sale deleted successfully',
              showConfirmButton: false,
              timer: 1500,
            });

            const currentUrl = this.router.url;
            if (currentUrl.toString().includes('admin')) {
              this.router
                .navigateByUrl('admin', { skipLocationChange: true })
                .then(() => {
                  this.router.navigate(['admin/sales']);
                });
            } else {
              this.router
                .navigateByUrl('', { skipLocationChange: true })
                .then(() => {
                  this.router.navigate(['sales']);
                });
            }
          } else {
            this.showSpinner = false;
            Swal.fire(response.status, response.message, 'error');
          }
        });
      }
    });
  }
}
