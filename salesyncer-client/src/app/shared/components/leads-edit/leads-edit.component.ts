import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { Router, ActivatedRoute } from '@angular/router';
import { SharedApiService } from 'src/app/shared/services/shared-api.service';

import { Store } from '@ngrx/store';
import { selectEmployeeData } from '../../../employee/store/selectors/user.selectors';
import * as UserActions from '../../../employee/store/actions/user.actions';

@Component({
  selector: 'app-leads-edit',
  templateUrl: './leads-edit.component.html',
  styleUrls: ['./leads-edit.component.scss'],
})
export class LeadsEditComponent implements OnInit {
  leadSourceData: any;
  productCategoryData: any;
  productsData: any;
  status!: any;
  employeesData!: any;
  currentOwner!: string;
  currentBranch!: string;
  submitted: boolean = false;
  leadsGroup!: FormGroup;
  branchData!: any;
  showSpinner: boolean = false;
  leadData!: any;
  leadsData!:any;
  _id!: any;

  constructor(
    private sharedAPI: SharedApiService,
    private fb: FormBuilder,
    private router: Router,
    private store: Store,
    private activatedRouter: ActivatedRoute
  ) {

    this._id = this.activatedRouter.snapshot.queryParamMap.get('_id');

    this.activatedRouter.data.subscribe((data) => {
      this.leadSourceData = data['initData'].leadSourceData.leadSourceData;
      this.productCategoryData = data['initData'].productCategoryData.productCategoryData;
      this.productsData = data['initData'].productsData.productsData;
      this.branchData = data['initData'].branchData.branchData;
      this.employeesData = data['initData'].employeesData.employeesData;
      this.leadsData = data['initData'].leadsData.leadsData;
      this.leadData=this.leadsData.find((lead:any)=>(lead._id==this._id))
      // console.log("lead data",this.leadData)
      this.initFormgroup();
    });





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
    // this.getEmployeesData();
    // this.getBranchData();
    // this.getLeadSource();
    // this.getProductCategory();
    // this.getProducts();
    // this.getleadData();
  }

  getleadData() {
    this._id = this.activatedRouter.snapshot.queryParamMap.get('_id');
    console.log('selected contact', this._id);
    this.sharedAPI.getLead(this._id).subscribe((response) => {
      this.leadData = response.LeadData;
      console.log('lead data  ', this.leadData);
      this.initFormgroup();
    });
  }

  getEmployeesData() {
    this.sharedAPI.getEmployeesData().subscribe((response) => {
      if (response) {
        this.employeesData = response.employeesData;
        console.log('Owner list loaded');
        this.initFormgroup();
      }
    });
    this.store.dispatch(UserActions.retrieveEmployeeData());

    this.store.select(selectEmployeeData).subscribe((response) => {
      if (response) {
        this.currentOwner = response.name;
        this.currentBranch = response.branch;
        console.log('Current owner data loaded');
        this.initFormgroup();
      }
    });
  }

  getBranchData() {
    try {
      this.sharedAPI.getBranches().subscribe((response: any) => {
        if (response.status == 'OK') {
          this.branchData = response.branchData;
          console.log('Branch data loaded');
          this.initFormgroup();
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
          console.log('Lead source loaded');
          this.initFormgroup();
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
          this.initFormgroup();
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
          this.initFormgroup();
        } else {
          console.log(response.message);
        }
      });
    } catch (error) {
      console.log(error);
    }
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
        status,
        source,
        productCategory,
        product,
        quotedPrice,
        owner,
        notes,
      } = data.value;
      const body = {
        _id:this._id,
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
      console.log('Data-->', body);

      this.sharedAPI.editLead(body).subscribe((response) => {
        // console.log(response);

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
}
