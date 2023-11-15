import { Component, OnInit } from '@angular/core';
import * as branchDataActions from '../../../shared/store/actions/branchData.actions';
import * as leadsDataActions from '../../../shared/store/actions/leadsData.actions';
import * as productsDataActions from '../../../shared/store/actions/productsData.actions';
import * as activitiesDataActions from '../../../shared/store/actions/activitiesData.actions';
import * as salesDataActions from '../../../shared/store/actions/salesData.actions';
import * as employeesDataActions from '../../../shared/store/actions/employeesData.actions';
import { selectBranchData } from '../../../shared/store/selectors/branchData.selectors';
import { selectLeadsData } from '../../../shared/store/selectors/leadsData.selectors';
import { selectProductsData } from '../../../shared/store/selectors/productsData.selectors';
import { SharedApiService } from 'src/app/shared/services/shared-api.service';
import {
  Activity,
  Branch,
  BranchData,
  Employee,
  Lead,
  Product,
  Sale,
} from 'src/app/shared/interfaces/interfaces';
import { Store } from '@ngrx/store';
import { selectActivitiesData } from 'src/app/shared/store/selectors/activitiesData.selectors';
import { selectSalesData } from 'src/app/shared/store/selectors/salesData.selectors';
import { selectEmployeesData } from 'src/app/shared/store/selectors/employeesData.selectors';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss'],
})
export class AdminDashboardComponent implements OnInit {
  branchData!: Branch[];
  leadsData!: Lead[];
  productsData!: Product[];
  activitiesData!: Activity[];
  salesData!: Sale[];
  employeesData!: Employee[];
  role!:string;
  constructor(private sharedApi: SharedApiService, private store: Store) {
  }

  ngOnInit() {
    this.role="admin";
    this.getBranchData();
    this.getProductsData();
    this.getActivitiesData();
    this.getSalesData();
    this.getEmployeesData();
    // this.getProductCategoriesData();
    // this.getActivityTypesData();
    // this.getLeadSourceData();
  }

  getBranchData() {
    this.store.dispatch(branchDataActions.retrieveBranchData());
    this.store.select(selectBranchData).subscribe((response) => {
      this.branchData = response;
    });
  }



  getProductsData() {
    this.store.dispatch(productsDataActions.retrieveProductsData());
    this.store.select(selectProductsData).subscribe((response) => {
      this.productsData = response;
    });
  }

  getActivitiesData() {
    this.store.dispatch(activitiesDataActions.retrieveActivitiesData());
    this.store.select(selectActivitiesData).subscribe((response) => {
      this.activitiesData = response;
    });
  }

  getSalesData() {
    this.store.dispatch(salesDataActions.retrieveSalesData());
    this.store.select(selectSalesData).subscribe((response) => {
      this.salesData = response;
    });
  }
  getEmployeesData() {
    this.store.dispatch(employeesDataActions.retrieveEmployeesData());
    this.store.select(selectEmployeesData).subscribe((response) => {
      this.employeesData = response;
    });
  }


}
