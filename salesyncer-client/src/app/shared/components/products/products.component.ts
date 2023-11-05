import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { SharedApiService } from 'src/app/shared/services/shared-api.service';
import { Router } from '@angular/router';

import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent implements OnInit, AfterViewInit {
  showSpinner: boolean = false;
  productsData!: any;

  dataSource!: MatTableDataSource<any>;
  displayedColumns: string[] = [
    'productId',
    'name',
    'category',
    'status',
    'mrp',
    'lsp',
    'actions',
  ];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private sharedAPI: SharedApiService, private router: Router) {}

  ngOnInit() {
    this.sharedAPI.getProducts().subscribe((response) => {
      this.productsData = response.productsData;
      this.dataSource = new MatTableDataSource(this.productsData);
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

  navCreateProduct() {
    const currentroute = this.router.url;
    if (currentroute.toString().includes('admin')) {
      this.router.navigate(['admin/products-create']);
    } else {
      this.router.navigate(['products-create']);
    }
  }

  navEditProduct(_id: string) {
    const currentroute = this.router.url;
    if (currentroute.toString().includes('admin')) {
      this.router.navigate(['admin/products-edit'], { queryParams: { _id } });
    } else {
      this.router.navigate(['products-edit'], { queryParams: { _id } });
    }
  }
  navViewProduct(_id: string) {
    const currentroute = this.router.url;
    if (currentroute.toString().includes('admin')) {
      this.router.navigate(['admin/products-view'], { queryParams: { _id } });
    } else {
      this.router.navigate(['products-view'], { queryParams: { _id } });
    }
  }

  deleteProduct(_id: string) {
    Swal.fire({
      title: 'Confirmation',
      text: `Are you sure to delete the product?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33  ',
      confirmButtonText: 'Yes',
    }).then((result) => {
      if (result.isConfirmed) {
        this.showSpinner = true;
        this.sharedAPI.deleteProduct(_id).subscribe((response) => {
          if (response.status == 'OK') {
            this.showSpinner = false;

            Swal.fire({
              position: 'center',
              icon: 'success',
              title: 'Product deleted successfully',
              showConfirmButton: false,
              timer: 1500,
            });

            const currentUrl = this.router.url;
            if (currentUrl.toString().includes('admin')) {
              this.router
                .navigateByUrl('admin', { skipLocationChange: true })
                .then(() => {
                  this.router.navigate(['admin/products']);
                });
            } else {
              this.router
                .navigateByUrl('', { skipLocationChange: true })
                .then(() => {
                  this.router.navigate(['products']);
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
