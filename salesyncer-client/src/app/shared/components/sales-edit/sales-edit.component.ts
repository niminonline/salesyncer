import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { ActivatedRoute, Router } from '@angular/router';
import { SharedApiService } from 'src/app/shared/services/shared-api.service';

import { selectEmployeeData } from '../../../employee/store/selectors/user.selectors';


@Component({
  selector: 'app-sales-edit',
  templateUrl: './sales-edit.component.html',
  styleUrls: ['./sales-edit.component.scss']
})
export class SalesEditComponent implements OnInit {
  productCategoryData: any;
  productsData: any;
  employeesData!: any;
  submitted: boolean = false;
  inputGroup!: FormGroup;
  branchData!: any;
  showSpinner: boolean = false;
  leadsData!: any;
  saleData!:any;
  _id: string | null;
  currentBranch!: string;
  currentEmployee!: string;
  currentLead!: string;
  currentInvoiceNumber!: string;
  currentProductCategory!: string;
  currentProductName!: string;
  currentSaleDate!: string;
  currentAmount!: string;
  
  constructor(
    private sharedAPI: SharedApiService,
    private fb: FormBuilder,
    private router: Router,
    private activatedRouter: ActivatedRoute
  ) {
    this._id = this.activatedRouter.snapshot.queryParamMap.get('_id');
    // console.log('ID=', this._id);
  }

  ngOnInit() {
    this.getEmployeesData();
    this.getBranchData();
    this.getProductCategory();
    this.getProducts();
    this.getLeadsData();
    this.getSaleData();
    // this.initFormgroup();
  }

  getEmployeesData() {
    this.sharedAPI.getEmployeesData().subscribe((response) => {
      if (response) {
        this.employeesData = response.employeesData;
        console.log('Employees list loaded');
      }
    });

      this.initFormgroup();
    
  }

  getBranchData() {
    try {
      this.sharedAPI.getBranches().subscribe((response: any) => {
        if (response.status == 'OK') {
          this.branchData = response.branchData;
          console.log('Branch data loaded');
        } else {
          console.log(response.message);
        }
      });
    } catch (error) {
      console.log(error);
    }
  }

  getLeadsData() {
    try {
      this.sharedAPI.getLeads().subscribe((response: any) => {
        if (response.status == 'OK') {
          this.leadsData = response.leadsData;
          console.log('Leads data loaded');
        } else {
          console.log(response.message);
        }

        this.initFormgroup();
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
          console.log('Products data loaded');
        } else {
          console.log(response.message);
        }
      });
    } catch (error) {
      console.log(error);
    }
  }
  getSaleData(){
    this.sharedAPI.getSale(this._id).subscribe((response)=>{
      this.saleData= response.saleData;
      this.currentBranch= this.saleData.branchName;
      this.currentEmployee= this.saleData.employeeName;
      this.currentLead= this.saleData.lead._id;
      this.currentInvoiceNumber= this.saleData.invoiceNumber;
      this.currentProductCategory= this.saleData.productCategory;
      this.currentProductName= this.saleData.productName;
      this.currentSaleDate= this.saleData.date;
      this.currentAmount= this.saleData.amount;
      this.initFormgroup();
    })

  }


  initFormgroup() {
    this.inputGroup = this.fb.group({
      branchName: [this.currentBranch, [Validators.required]],
      employeeName: [this.currentEmployee, [Validators.required]],
      lead: [this.currentLead, [Validators.required]],
      invoiceNumber: [this.currentInvoiceNumber, [Validators.required]],
      productCategory: [this.currentProductCategory, [Validators.required]],
      productName: [this.currentProductName, [Validators.required]],
      date: [this.currentSaleDate, [Validators.required]],
      amount: [this.currentAmount, [Validators.pattern(/^\d+(\.\d+)?$/)]],
    });
  }

  submitForm(data: any): void {
    this.submitted = true;
    console.log(data.value);
    if (!data.invalid) {
      this.showSpinner = true;

      // console.log('Data', data);
      const {
        branchName,
        employeeName,
        client,
        lead,
        invoiceNumber,
        productCategory,
        productName,
        date,
        amount,
      } = data.value;
      const body = {
        _id:this._id,
        branchName,
        employeeName,
        client,
        lead,
        invoiceNumber,
        productCategory,
        productName,
        date,
        amount,
      };
      console.log('Data', body);

      this.sharedAPI.editSale(body).subscribe((response) => {
        // console.log(response);

        if (response && response.status !== 'OK') {
          this.showSpinner = false;
          Swal.fire('Error', response.message, 'error');
        } else {
          this.showSpinner = false;
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Sale updated successfully',
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
}
