import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { SharedApiService } from 'src/app/shared/services/shared-api.service';

@Component({
  selector: 'app-leads-create',
  templateUrl: './leads-create.component.html',
  styleUrls: ['./leads-create.component.scss'],
})
export class LeadsCreateComponent implements OnInit {
  leadSourceData: any;
  productCategoryData: any;
  productsData: any;
  constructor(
    private sharedAPI: SharedApiService,
    private fb: FormBuilder,
    private router: Router
  ) {}

  submitted: boolean = false;
  leadsGroup!: FormGroup;
  branchData!: any;
  showSpinner: boolean = false;

  ngOnInit() {
    this.getBranchData();
    this.getLeadSource();
    this.getProductCategory();
    this.getProducts();
    this.leadsGroup = this.fb.group({
      branch: ['', [Validators.required]],
      type: ['', [Validators.required]],
      client: ['', [Validators.required]],
      source: ['', [Validators.required]],
      productCategory: ['', [Validators.required]],
      products: ['', [Validators.required]],
      quotedPrice: ['', [Validators.pattern(/^\d+(\.\d+)?$/)]],
      owner: ['', [Validators.required]],
      notes: ['', [Validators.required]],
    });
  }

  getBranchData() {
    try {
      console.log("entered brsnch fetch")
      this.sharedAPI.getBranches().subscribe((response: any) => {
        if (response.status == 'OK') {
          this.branchData = response.branchData;
          console.log(this.branchData);
        } else {
          console.log(response.message);
        }
      });
    } catch (error) {
      console.log(error);
    }
  }

  getLeadSource() {
    try {
      this.sharedAPI.getLeadSource().subscribe((response: any) => {
        if (response.status == 'OK') {
          this.leadSourceData = response.leadSourceData;
          console.log(this.leadSourceData);
        } else {
          console.log(response.message);
        }
      });
    } catch (error) {
      console.log(error);
    }
  }
  getProductCategory() {
    try {
      this.sharedAPI.getProductCategory().subscribe((response: any) => {
        if (response.status == 'OK') {
          this.productCategoryData = response.productCategoryData;
          console.log(this.productCategoryData);
        } else {
          console.log(response.message);
        }
      });
    } catch (error) {
      console.log(error);
    }
  }
  getProducts() {
    try {
      this.sharedAPI.getProducts().subscribe((response: any) => {
        if (response.status == 'OK') {
          this.productsData = response.productsData;
          console.log(this.productsData);
        } else {
          console.log(response.message);
        }
      });
    } catch (error) {
      console.log(error);
    }
  }

  submitLeads(data: any): void {
    this.submitted = true;
    if (!data.invalid) {
      // console.log(data.value);
      // console.log('Data', data);
      const {
        branch,
        type,
        client,
        source,
        productCategory,
        product,
        quotedPrice,
        owner,
        notes,
      } = data.value;
      const body = {
        branch,
        type,
        client,
        source,
        productCategory,
        product,
        quotedPrice,
        owner,
        notes,
      };
      console.log('Data', body);

      this.sharedAPI.createContact(body).subscribe((response) => {
        // console.log(response);

        this.showSpinner = true;
        if (response && response.status !== 'OK') {
          this.showSpinner = false;
          Swal.fire('Error', response.message, 'error');
        } else {
          this.showSpinner = false;
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Contact created successfully',
            showConfirmButton: false,
            timer: 1500,
          });

          const currentUrl = this.router.url;
          this.router.navigate(['contacts']);
        }
      });
    } else {
      Swal.fire('Error', 'Please fill the fields without errors', 'error');
    }
  }
}
