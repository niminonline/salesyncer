import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { SharedApiService } from 'src/app/shared/services/shared-api.service';

import { Store } from '@ngrx/store';
import { selectContactsData } from 'src/app/employee/store/selectors/contacts.selectors ';
import { selectEmployeeData } from '../../../employee/store/selectors/user.selectors';
import * as UserActions from '../../../employee/store/actions/user.actions';

import * as ContactsActions from 'src/app/employee/store/actions/contacts.actions ';

@Component({
  selector: 'app-leads-create',
  templateUrl: './leads-create.component.html',
  styleUrls: ['./leads-create.component.scss'],
})
export class LeadsCreateComponent implements OnInit {
  leadSourceData: any;
  productCategoryData: any;
  productsData: any;
  contactData!: any;
  employeesData!: any;
  currentOwner!: string;
  currentBranch!: string;
  submitted: boolean = false;
  leadsGroup!: FormGroup;
  branchData!: any;
  showSpinner: boolean = false;

  constructor(
    private sharedAPI: SharedApiService,
    private fb: FormBuilder,
    private router: Router,
    private store: Store
  ) {}

  ngOnInit() {
    this.getContacts();
    this.getEmployeesData();
    this.getBranchData();
    this.getLeadSource();
    this.getProductCategory();
    this.getProducts();
   // this.initFormgroup();
    
  }

  getContacts() {
    this.store.dispatch(ContactsActions.retrieveContactsData());
    this.store.select(selectContactsData).subscribe((response) => {
      if(response){
        this.contactData = response;
        console.log("Client details loaded")
      }
    });
  }
  getEmployeesData() {
    this.sharedAPI.getEmployeesData().subscribe((response) => {
      if(response){
        this.employeesData = response.employeesData;
        console.log("Owner list loaded");

      }
    });
    this.store.dispatch(UserActions.retrieveEmployeeData());

    this.store.select(selectEmployeeData).subscribe((response) => {
      if (response) {
        this.currentOwner = response.name;
        this.currentBranch = response.branch;
        console.log("Current owner data loaded")
      }
       this.initFormgroup();
    });
  }

  getBranchData() {
    try {
      this.sharedAPI.getBranches().subscribe((response: any) => {
        if (response.status == 'OK') {
          this.branchData = response.branchData;
          console.log("Branch data loaded");
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
          console.log("Lead source loaded");
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
          console.log("Products data loaded");
        } else {
          console.log(response.message);
        }
      });
    } catch (error) {
      console.log(error);
    }
  }

  initFormgroup(){
    this.leadsGroup = this.fb.group({
      branch: [this.currentBranch, [Validators.required]],
      type: ['', [Validators.required]],
      client: ['', [Validators.required]],
      source: ['', [Validators.required]],
      productCategory: ['', [Validators.required]],
      products: ['', [Validators.required]],
      quotedPrice: ['', [Validators.pattern(/^\d+(\.\d+)?$/)]],
      owner: [this.currentOwner, [Validators.required]],
      notes: [''],
    });
  }

  submitLeads(data: any): void {
    this.submitted = true;
    if (!data.invalid) {
      this.showSpinner = true;
      
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

      this.sharedAPI.createLead(body).subscribe((response) => {
        // console.log(response);

      
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

          const currentroute= this.router.url;
          if(currentroute.toString().includes('admin'))
          {
           this.router.navigate(['admin/leads']);
          }
          else{
            this.router.navigate(['leads']);
          }
      
        }
      });
    } else {
      Swal.fire('Error', 'Please fill the fields without errors', 'error');
    }
  }
}
