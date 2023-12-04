import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { SharedApiService } from 'src/app/shared/services/shared-api.service';

import { Store } from '@ngrx/store';
import { selectEmployeeData } from '../../store/selectors/user.selectors';
import * as UserActions from '../../store/actions/user.actions';

@Component({
  selector: 'app-sales-create',
  templateUrl: './sales-create.component.html',
  styleUrls: ['./sales-create.component.scss'],
})
export class SalesCreateComponent implements OnInit {
  productCategoriesData: any;
  productsData: any;
  employeesData!: any;
  currentOwner!: string;
  currentBranch!: string;
  submitted: boolean = false;
  inputGroup!: FormGroup;
  branchData!: any;
  showSpinner: boolean = false;
  leadsData!: any;
  filteredProducts!: any;
  filteredEmployees!:any

  constructor(
    private sharedAPI: SharedApiService,
    private fb: FormBuilder,
    private router: Router,
    private store: Store
  ) {}

  ngOnInit() {
    this.getEmployeesData();
    this.getBranchData();
    this.getProductCategories();
    this.getProducts();
    this.getLeadsData();
    // this.initFormgroup();
  }

  getEmployeesData() {
    this.sharedAPI.getEmployeesData().subscribe((response) => {
      if (response) {
        this.employeesData = response.employeesData;
      }
      this.initFormgroup();
    });
    // this.store.dispatch(UserActions.retrieveEmployeeData());

    // this.store.select(selectEmployeeData).subscribe((response) => {
    //   if (response) {
    //     this.currentOwner = response.name;
    //     this.currentBranch = response.branch;
    //   }
    // });
  }

  getBranchData() {
    try {
      this.sharedAPI.getBranches().subscribe((response: any) => {
        if (response.status == 'OK') {
          this.branchData = response.branchData;
        } else {
          console.error(response.message);
        }
      });
    } catch (error) {
      console.error(error);
    }
  }

  getLeadsData() {
    try {
      this.sharedAPI.getLeads().subscribe((response: any) => {
        if (response.status == 'OK') {
          this.leadsData = response.leadsData;
        } else {
          console.error(response.message);
        }

        this.initFormgroup();
      });
    } catch (error) {
      console.error(error);
    }
  }
  getProductCategories() {
    try {
      this.sharedAPI.getProductCategories().subscribe((response: any) => {
        if (response.status == 'OK') {
          this.productCategoriesData = response.productCategoriesData;
        } else {
          console.error(response.message);
        }
      });
    } catch (error) {
      console.error(error);
    }
  }
  getProducts() {
    try {
      this.sharedAPI.getProducts().subscribe((response: any) => {
        if (response.status == 'OK') {
          this.productsData = response.productsData;
        } else {
          console.error(response.message);
        }
      });
    } catch (error) {
      console.error(error);
    }
  }

  initFormgroup() {
    this.inputGroup = this.fb.group({
      branchName: ['', [Validators.required]],
      employee_id: ['', [Validators.required]],
      lead: ['', [Validators.required]],
      invoiceNumber: ['', [Validators.required]],
      productCategory: ['', [Validators.required]],
      productName: ['', [Validators.required]],
      date: ['', [Validators.required]],
      amount: ['', [Validators.pattern(/^\d+(\.\d+)?$/)]],
    });


    // const categoryControl: FormControl = this.inputGroup.get(
    //   'productCategory'
    // ) as FormControl;
    // categoryControl.valueChanges.subscribe((selectedCategory) => {
    //   if (selectedCategory) {
    //     this.onCategoryChange(selectedCategory);
    //   }
    // });

    // const branchControl: FormControl = this.inputGroup.get(
    //   'branchName'
    // ) as FormControl;
    // branchControl.valueChanges.subscribe((selectedBranch) => {
    //   if (selectedBranch) {
    //     this.onBranchChange(selectedBranch);
    //   }
    // });


  }

  submitForm(data: any): void {
    this.submitted = true;
    if (!data.invalid) {
      // this.showSpinner = true;

      const currentEmployee = this.employeesData.find((employee: any) => {
        return employee._id == data.value.employee_id;
      });
      const employeeName = currentEmployee.name;
      const {
        branchName,
        employee_id,
        lead,
        invoiceNumber,
        productCategory,
        productName,
        date,
        amount,
      } = data.value;
      const body = {
        branchName,
        employee_id,
        employeeName,
        lead,
        invoiceNumber,
        productCategory,
        productName,
        date,
        amount,
      };

      this.sharedAPI.createSale(body).subscribe((response) => {
        if (response && response.status !== 'OK') {
          this.showSpinner = false;
          Swal.fire('Error', response.message, 'error');
        } else {
          this.showSpinner = false;
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Sale created successfully',
            showConfirmButton: false,
            timer: 1500,
          });

          const currentroute = this.router.url;
          if (currentroute.toString().includes('admin')) {
            this.router.navigate(['admin/sales']);
          } else {
            this.router.navigate(['sales']);
          }
        }
      });
    } else {
      Swal.fire('Error', 'Please fill the fields without errors', 'error');
    }
  }

  navSales(event: Event) {
    event.preventDefault();

    const currentroute = this.router.url;
    if (currentroute.toString().includes('admin')) {
      this.router.navigate(['admin/sales']);
    } else {
      this.router.navigate(['sales']);
    }
  }

  onCategoryChange(selectedCategory: string) {
    this.filteredProducts = this.productsData.filter(
      (product: any) => product.category == selectedCategory
    );
  }

  onBranchChange(selectedBranch: string) {
    this.filteredEmployees= this.employeesData.filter(
      (employee: any) => employee.branch == selectedBranch
    );
  }

}
