import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { SharedApiService } from 'src/app/shared/services/shared-api.service';

@Component({
  selector: 'app-products-create',
  templateUrl: './products-create.component.html',
  styleUrls: ['./products-create.component.scss'],
})
export class ProductsCreateComponent implements OnInit {
  submitted: boolean = false;
  inputGroup!: FormGroup;
  showSpinner: boolean = false;
  productCategoryData: any;

  constructor(
    private sharedAPI: SharedApiService,
    private fb: FormBuilder,
    private router: Router
  ) {}

  ngOnInit() {
    this.getProductCategory();
    this.initFormgroup();
  }

  getProductCategory() {
    try {
      this.sharedAPI.getProductCategory().subscribe((response: any) => {
        if (response.status == 'OK') {
          this.productCategoryData = response.productCategoryData;
        } else {
          console.log(response.message);
        }
      });
    } catch (error) {
      console.log(error);
    }
  }

  initFormgroup() {
    this.inputGroup = this.fb.group({
      name: ['', [Validators.required]],
      productCategory: ['', [Validators.required]],
      status: ['', [Validators.required]],
      mrp: ['', [Validators.pattern(/^\d+(\.\d+)?$/)]],
      lsp: ['', [Validators.pattern(/^\d+(\.\d+)?$/)]],
    });
  }

  submitForm(data: any): void {
    this.submitted = true;
   
    // console.log(data.value);
    if (!data.invalid) {
      if( parseFloat(data.value.mrp)<= parseFloat(data.value.lsp)){
        Swal.fire('Error', "LSP must be less than or equal to MRP", 'error');
        return;
      }

      this.showSpinner = true;

      const { name, productCategory, status, mrp, lsp } = data.value;

      const body = {
        name,
        category: productCategory,
        status,
        mrp,
        lsp,
      };
      // console.log('Data', body);

      this.sharedAPI.createProduct(body).subscribe((response) => {
        // console.log(response);

        if (response && response.status !== 'OK') {
          this.showSpinner = false;
          Swal.fire('Error', response.message, 'error');
        } else {
          this.showSpinner = false;
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Product created successfully',
            showConfirmButton: false,
            timer: 1500,
          });

          const currentroute = this.router.url;
          if (currentroute.toString().includes('admin')) {
            this.router.navigate(['admin/products']);
          } else {
            this.router.navigate(['products']);
          }
        }
      });
    } else {
      Swal.fire('Error', 'Please fill the fields without errors', 'error');
    }
  }

  navProducts(event: Event) {
    event.preventDefault();

    const currentroute = this.router.url;
    if (currentroute.toString().includes('admin')) {
      this.router.navigate(['admin/products']);
    } else {
      this.router.navigate(['products']);
    }
  }
}
{
}
