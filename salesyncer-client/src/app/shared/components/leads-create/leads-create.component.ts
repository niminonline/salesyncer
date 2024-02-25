import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { SharedApiService } from 'src/app/shared/services/shared-api.service';

import { Store } from '@ngrx/store';
import { selectContactsData } from 'src/app/shared/store/selectors/contacts.selectors';
import { selectEmployeeData } from '../../store/selectors/user.selectors';
import * as UserActions from '../../store/actions/user.actions';

import * as ContactsActions from 'src/app/shared/store/actions/contacts.actions';
import { selectEmployeesData } from '../../store/selectors/employeesData.selectors';
import { selectBranchData } from '../../store/selectors/branchData.selectors';
import { selectLeadSourceData } from '../../store/selectors/leadSourceData.selectors';
import { selectProductCategoriesData } from '../../store/selectors/productCategoriesData.selectors';
import { selectProductsData } from '../../store/selectors/productsData.selectors';
import { Branch, Contact, Employee, LeadSource, ProductCategory } from '../../interfaces/interfaces';

@Component({
  selector: 'app-leads-create',
  templateUrl: './leads-create.component.html',
  styleUrls: ['./leads-create.component.scss'],
})
export class LeadsCreateComponent implements OnInit {
  leadSourceData: any;
  productCategoriesData: any;
  productsData: any;
  contactData!: any;
  employeesData!: any;
  currentOwner!: string;
  currentBranch!: string;
  submitted: boolean = false;
  leadsGroup!: FormGroup;
  branchData!: any;
  showSpinner: boolean = false;
  selectedCategory!: string;
  filteredProducts!: any;

  constructor(
    private sharedAPI: SharedApiService,
    private fb: FormBuilder,
    private router: Router,
    private store: Store
  ) {
    // this.selectedCategory="";
  }

  ngOnInit() {
    this.getContacts();
    this.getEmployeesData();
    this.getBranchData();
    this.getLeadSourceData();
    this.getProductCategoriesData();
    this.getProductsData();
    // this.initFormgroup();
  }

  getContacts() {
    this.store.dispatch(ContactsActions.retrieveContactsData());
    this.store.select(selectContactsData).subscribe((response) => {
      if (response) {
        this.contactData = response;
      }
    });
  }
  getEmployeesData() {
    this.store.select(selectEmployeesData).subscribe((response) => {
      this.employeesData=response;
    });
    this.initFormgroup();
    // this.store.dispatch(UserActions.retrieveEmployeeData());

    // this.store.select(selectEmployeeData).subscribe((response) => {
    //   if (response) {
    //     this.currentOwner = response.name;
    //     this.currentBranch = response.branch;
    //   }
    // });
  }

  getBranchData() {
    this.store.select(selectBranchData).subscribe((response) => {
     this.branchData= response;
    });
  }

  getLeadSourceData() {
    this.store.select(selectLeadSourceData).subscribe((response) => {
      this.leadSourceData=response;
    });

  }
  getProductCategoriesData() {
    this.store.select(selectProductCategoriesData).subscribe((response) => {
     this.productCategoriesData=response;
    });
  }
  getProductsData() {
    this.store.select(selectProductsData).subscribe((response) => {
     this.productsData=response;
    });
  }

  initFormgroup() {
    this.leadsGroup = this.fb.group({
      branch: ['', [Validators.required]],
      type: ['', [Validators.required]],
      client: ['', [Validators.required]],
      source: ['', [Validators.required]],
      productCategory: ['', [Validators.required]],
      product: ['', [Validators.required]],
      quotedPrice: ['', [Validators.pattern(/^\d+(\.\d+)?$/)]],
      owner: [this.currentOwner, [Validators.required]],
      notes: [''],
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

      this.sharedAPI.createLead(body).subscribe((response) => {

        if (response && response.status !== 'OK') {
          this.showSpinner = false;
          Swal.fire('Error', response.message, 'error');
        } else {
          this.showSpinner = false;
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Lead created successfully',
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

  onCategoryChange(selectedCategory: string) {
    this.filteredProducts = this.productsData.filter(
      (product: any) => product.category == selectedCategory
    );
  }

  trackByEmployees(index: number, employee: Employee): string {
    return employee._id; 
  }

  trackByContact(index: number, contact: Contact): string {
    return contact._id; 
  }

  trackByBranch(index: number, branch: Branch): string {
    return branch._id; 
  }

  trackByLeadSource(index: number, leadSource: LeadSource): string {
    return leadSource._id; 
  }

  trackByProductCategory(index: number, productCategory: ProductCategory): string {
    return productCategory._id; 
  }
}
