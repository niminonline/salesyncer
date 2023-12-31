import { Component, OnInit, ViewChild } from '@angular/core';
import { SharedApiService } from 'src/app/shared/services/shared-api.service';
import { AdminAPIService } from '../../services/admin-api.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-manage-product-category',
  templateUrl: './manage-product-category.component.html',
  styleUrls: ['./manage-product-category.component.scss'],
})
export class ManageProductCategoryComponent implements OnInit {
  productCategoriesData!: any;
  displayedColumns = ['productCategory', 'actions'];
  dataSource: any;
  _id!: string | null;
  showSpinner: boolean = false;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(
    private sharedApi: SharedApiService,
    private adminAPI: AdminAPIService,
    private router: Router
  ) {}

  ngOnInit() {
    this.sharedApi.getProductCategories().subscribe((response: any) => {
      this.productCategoriesData = response.productCategoriesData;
      this.dataSource = new MatTableDataSource(this.productCategoriesData);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  createProductCategory() {
    Swal.fire({
      title: 'Enter Category Name',
      html: '<input id="productCategory" class="swal2-input" placeholder="Product Category Name">',
      showCancelButton: true,
      confirmButtonText: 'Create',
      cancelButtonText: 'Cancel',
      focusConfirm: false,
      preConfirm: () => {
        const productCategoryElement = Swal.getPopup()?.querySelector(
          '#productCategory'
        ) as HTMLInputElement;

        const productCategory = productCategoryElement.value;

        if (!productCategory) {
          Swal.showValidationMessage('Please fill the input field');
        }
        return { productCategory };
      },
    }).then((result) => {
      if (result.isConfirmed) {
        this.adminAPI
          .createProductCategory(result.value)
          .subscribe((response) => {
            if (response.status !== 'OK') {
              Swal.fire({
                icon: 'error',
                title: 'Error',
                text: response.message,
              });
            } else {
              Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'Product Category created successfully',
                showConfirmButton: false,
                timer: 1500,
              });

              const currentUrl = this.router.url;
              this.router
                .navigateByUrl('admin', { skipLocationChange: true })
                .then(() => {
                  this.router.navigateByUrl(currentUrl);
                });
            }
          });
      }
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  editProductCategory(_id: string) {
    const selectedCategory = this.productCategoriesData.find((type: any) => {
      return type._id == _id;
    });
    // const currentBranch= ...selectedBranch;
    const currentCategory = selectedCategory.productCategory;
    if (currentCategory) {
      Swal.fire({
        title: 'Update product category details',
        html: `<input id="productCategory" class="swal2-input" placeholder="Branch Code" value="${currentCategory}">`,
        showCancelButton: true,
        confirmButtonText: 'Update',
        cancelButtonText: 'Cancel',
        focusConfirm: false,
        preConfirm: () => {
          const productCategoryElement = Swal.getPopup()?.querySelector(
            '#productCategory'
          ) as HTMLInputElement;

          const productCategory = productCategoryElement.value;

          if (!productCategory) {
            Swal.showValidationMessage('Please fill the input field');
          }
          return { productCategory };
        },
      }).then((result) => {
        if (result.isConfirmed) {
          const data = {
            _id: _id,
            productCategory: result.value.productCategory,
          };
          this.adminAPI.editProductCategory(data).subscribe((response) => {
            if (response.status !== 'OK') {
              Swal.fire({
                icon: 'error',
                title: 'Error',
                text: response.message,
              });
            } else {
              Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'Product category updated successfully',
                showConfirmButton: false,
                timer: 1500,
              });

              const currentUrl = this.router.url;
              this.router
                .navigateByUrl('admin', { skipLocationChange: true })
                .then(() => {
                  this.router.navigateByUrl(currentUrl);
                });
            }
            {
            }
          });
        }
      });
    }
  }

  deleteProductCategory(_id: string) {
    Swal.fire({
      title: 'Confirmation',
      text: `Are you sure to delete the product category?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33  ',
      confirmButtonText: 'Yes',
    }).then((result) => {
      if (result.isConfirmed) {
        this.showSpinner = true;
        this.adminAPI.deleteProductCategory(_id).subscribe((response) => {
          if (response.status == 'OK') {
            this.showSpinner = false;

            Swal.fire({
              position: 'center',
              icon: 'success',
              title: 'Product category deleted successfully',
              showConfirmButton: false,
              timer: 1500,
            });

            const currentUrl = this.router.url;
            this.router
              .navigateByUrl('admin', { skipLocationChange: true })
              .then(() => {
                this.router.navigateByUrl(currentUrl);
              });
          } else {
            this.showSpinner = false;
            Swal.fire(response.status, response.message, 'error');
          }
        });
      }
    });
  }
}
