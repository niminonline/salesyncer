import { Component, OnInit } from '@angular/core';
import * as branchDataActions from '../../../shared/store/actions/branchData.actions';
import * as leadsDataActions from '../../../shared/store/actions/leadsData.actions';
import * as leadSourceDataActions from '../../../shared/store/actions/leadSourceData.actions';
import * as productsDataActions from '../../../shared/store/actions/productsData.actions';
import * as productCategoriesDataActions from '../../../shared/store/actions/productCategoriesData.actions';
import * as activitiesDataActions from '../../../shared/store/actions/activitiesData.actions';
import * as activityTypesDataActions from '../../../shared/store/actions/activityTypesData.actions';
import * as salesDataActions from '../../../shared/store/actions/salesData.actions';
import * as employeesDataActions from '../../../shared/store/actions/employeesData.actions';
import { selectBranchData } from '../../../shared/store/selectors/branchData.selectors';
import { selectLeadsData } from '../../../shared/store/selectors/leadsData.selectors';
import { selectLeadSourceData } from '../../../shared/store/selectors/leadSourceData.selectors';
import { selectProductsData } from '../../../shared/store/selectors/productsData.selectors';
import { selectProductCategoriesData } from 'src/app/shared/store/selectors/productCategoriesData.selectors';
import { SharedApiService } from 'src/app/shared/services/shared-api.service';
import { BranchData } from 'src/app/shared/interfaces/interfaces';
import { Store } from '@ngrx/store';
import { selectActivitiesData } from 'src/app/shared/store/selectors/activitiesData.selectors';
import { selectActivityTypesData } from 'src/app/shared/store/selectors/activityTypesData.selectors';
import { selectSalesData } from 'src/app/shared/store/selectors/salesData.selectors';
import { selectEmployeesData } from 'src/app/shared/store/selectors/employeesData.selectors';

@Component({
  selector: 'app-employee-dashboard',
  templateUrl: './employee-dashboard.component.html',
  styleUrls: ['./employee-dashboard.component.scss'],
})
export class EmployeeDashboardComponent implements OnInit {
  branchData!: BranchData;
  constructor(private sharedApi: SharedApiService, private store: Store) {}

  ngOnInit() {
    // this.getBranchData();
    // this.getLeadsData();
    // this.getLeadSourceData();
    // this.getProductsData();
    // this.getProductCategoriesData();
    // this.getActivitiesData();
    // this.getActivityTypesData();
    // this.getSalesData();
    this.getEmployeesData();
  }

  getBranchData() {
    this.store.dispatch(branchDataActions.retrieveBranchData());
    this.store.select(selectBranchData).subscribe((response) => {
    });
  }

  getLeadsData() {
    this.store.dispatch(leadsDataActions.retrieveLeadsData());
    this.store.select(selectLeadsData).subscribe((response) => {
    });
  }
  getLeadSourceData() {
    this.store.dispatch(leadSourceDataActions.retrieveLeadSourceData());
    this.store.select(selectLeadSourceData).subscribe((response) => {
    });
  }
  getProductsData() {
    this.store.dispatch(productsDataActions.retrieveProductsData());
    this.store.select(selectProductsData).subscribe((response) => {
    });
  }
  getProductCategoriesData() {
    this.store.dispatch(productCategoriesDataActions.retrieveProductCategoriesData());
    this.store.select(selectProductCategoriesData).subscribe((response) => {
    });
  }
  getActivitiesData() {
    this.store.dispatch(activitiesDataActions.retrieveActivitiesData());
    this.store.select(selectActivitiesData).subscribe((response) => {
    });
  }
  getActivityTypesData() {
    this.store.dispatch(activityTypesDataActions.retrieveActivityTypesData());
    this.store.select(selectActivityTypesData).subscribe((response) => {
    });
  }
  getSalesData() {
    this.store.dispatch(salesDataActions.retrieveSalesData());
    this.store.select(selectSalesData).subscribe((response) => {
    });
  }
  getEmployeesData() {
    this.store.dispatch(employeesDataActions.retrieveEmployeesData());
    this.store.select(selectEmployeesData).subscribe((response) => {
    });
  }
}
