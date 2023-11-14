import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { Router, ActivatedRoute } from '@angular/router';
import { SharedApiService } from 'src/app/shared/services/shared-api.service';

import { Store } from '@ngrx/store';
import { selectEmployeeData } from '../../store/selectors/user.selectors';
import * as UserActions from '../../store/actions/user.actions';
import { selectEmployeesData } from '../../store/selectors/employeesData.selectors';
import { selectBranchData } from '../../store/selectors/branchData.selectors';
import { selectLeadSourceData } from '../../store/selectors/leadSourceData.selectors';
import { selectProductCategoriesData } from '../../store/selectors/productCategoriesData.selectors';
import { selectProductsData } from '../../store/selectors/productsData.selectors';
import {
  Employee,
  Lead,
  LeadSource,
  LeadSourceData,
  Product,
  ProductCategoriesData,
  ProductCategory,
  ProductsData,
} from '../../interfaces/interfaces';

@Component({
  selector: 'app-leads-edit',
  templateUrl: './leads-edit.component.html',
  styleUrls: ['./leads-edit.component.scss'],
})
export class LeadsEditComponent implements OnInit {
  leadSourceData!: LeadSource[];
  productCategoriesData!: ProductCategory[];
  productsData!: Product[];
  status!: any;
  employeesData!: Employee[];
  currentOwner!: string;
  currentBranch!: string;
  submitted: boolean = false;
  leadsGroup!: FormGroup;
  branchData!: any;
  showSpinner: boolean = false;
  leadData!: any;
  leadsData!: any;
  _id!: any;
  filteredProducts: any;
  selectedCategory: any;

  constructor(
    private sharedAPI: SharedApiService,
    private fb: FormBuilder,
    private router: Router,
    private store: Store,
    private activatedRouter: ActivatedRoute
  ) {
    this.leadsGroup = this.fb.group({
      branch: [this.leadData?.branch || '', [Validators.required]],
      type: [this.leadData?.type || '', [Validators.required]],
      status: [this.leadData?.status || '', [Validators.required]],
      source: [this.leadData?.source || '', [Validators.required]],
      productCategory: [
        this.leadData?.productCategory || '',
        [Validators.required],
      ],
      product: [this.leadData?.product || '', [Validators.required]],
      quotedPrice: [
        this.leadData?.quotedPrice || '',
        [Validators.pattern(/^\d+(\.\d+)?$/)],
      ],
      owner: [this.leadData?.owner || '', [Validators.required]],
      notes: [this.leadData?.notes || ''],
    });
  }

  ngOnInit() {
    this.getEmployeesData();
    this.getBranchData();
    this.getLeadSourceData();
    this.getProductCategoriesData();
    this.getProductsData();
    this.getleadData();
  }

  getleadData() {
    this._id = this.activatedRouter.snapshot.queryParamMap.get('_id');
    this.sharedAPI.getLead(this._id).subscribe((response) => {
      this.leadData = response.LeadData;
      this.initFormgroup();
    });
  }

  getEmployeesData() {
    this.store.select(selectEmployeesData).subscribe((response) => {

      this.employeesData = response;
      // this.initFormgroup();
    });
    this.store.dispatch(UserActions.retrieveEmployeeData());

    this.store.select(selectEmployeeData).subscribe((response) => {
      if (response) {
        this.currentOwner = response.name;
        this.currentBranch = response.branch;
        // this.initFormgroup();
      }
    });
  }

  getBranchData() {
    this.store.select(selectBranchData).subscribe((response) => {
      this.branchData = response;
    });
  }

  getLeadSourceData() {
    this.store.select(selectLeadSourceData).subscribe((response) => {
      this.leadSourceData = response;
    });
  }

  getProductsData() {
    this.store.select(selectProductsData).subscribe((response) => {
      this.productsData = response;
      this.filteredProducts=this.productsData;

      this.initFormgroup();
    });
  }

  getProductCategoriesData() {
    this.store.select(selectProductCategoriesData).subscribe((response) => {
      this.productCategoriesData = response;
    });
  }
  

  initFormgroup() {
    if (this.leadsGroup) {
      this.leadsGroup.reset();
    }

    this.leadsGroup = this.fb.group({
      branch: [this.leadData?.branch || '', [Validators.required]],
      type: [this.leadData?.type || '', [Validators.required]],
      status: [this.leadData?.status || '', [Validators.required]],
      source: [this.leadData?.source || '', [Validators.required]],
      productCategory: [
        this.leadData?.productCategory || '',
        [Validators.required],
      ],
      product: [this.leadData?.product || '', [Validators.required]],
      quotedPrice: [
        this.leadData?.quotedPrice || '',
        [Validators.pattern(/^\d+(\.\d+)?$/)],
      ],
      owner: [this.leadData?.owner || '', [Validators.required]],
      notes: [this.leadData?.notes || ''],
    });

    const categoryControl: FormControl = this.leadsGroup.get(
      'productCategory'
    ) as FormControl;
    categoryControl.valueChanges.subscribe((selectedCategory) => {
      if (selectedCategory) {
        this.onCategoryChange(selectedCategory);
      }
    });
  }

  submitLeads(data: any): void {
    this.submitted = true;
    if (!data.invalid) {
      this.showSpinner = true;

      const {
        branch,
        type,
        status,
        source,
        productCategory,
        product,
        quotedPrice,
        owner,
        notes,
      } = data.value;
      const body = {
        _id: this._id,
        branch,
        type,
        status,
        source,
        productCategory,
        product,
        quotedPrice,
        owner,
        notes,
      };

      this.sharedAPI.editLead(body).subscribe((response) => {
        if (response && response.status !== 'OK') {
          this.showSpinner = false;
          Swal.fire('Error', response.message, 'error');
        } else {
          this.showSpinner = false;
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Lead update successfully',
            showConfirmButton: false,
            timer: 1500,
          });

          const currentroute = this.router.url;
          if (currentroute.toString().includes('admin')) {
            this.router.navigate(['admin/leads']);
          } else {
            this.router.navigate(['leads']);
          }
        }
      });
    } else {
      Swal.fire('Error', 'Please fill the fields without errors', 'error');
    }
  }

  navLeads(event: Event) {
    event.preventDefault();

    const currentroute = this.router.url;
    if (currentroute.toString().includes('admin')) {
      this.router.navigate(['admin/leads']);
    } else {
      this.router.navigate(['leads']);
    }
  }
  // onCategoryChange() {
    // this.filteredProducts = this.productsData.filter(
    //   (product: any) => product.category == this.selectedCategory
    // );
  // }

  onCategoryChange(selectedCategory: string) {
    this.filteredProducts = this.productsData.filter(
      (product: any) => product.category == selectedCategory
    );
  }
}
