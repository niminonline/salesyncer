import { Component, OnInit, OnDestroy ,ngDoCheck} from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
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
import { Activity, Branch, Employee, Lead, Product, Sale } from 'src/app/shared/interfaces/interfaces';
import { selectActivitiesData } from 'src/app/shared/store/selectors/activitiesData.selectors';
import { selectSalesData } from 'src/app/shared/store/selectors/salesData.selectors';
import { selectEmployeesData } from 'src/app/shared/store/selectors/employeesData.selectors';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss'],
})
export class AdminDashboardComponent implements  OnDestroy,ngDoCheck {
  branchData!: Branch[];
  leadsData!: Lead[];
  productsData!: Product[];
  activitiesData!: Activity[];
  salesData!: Sale[];
  employeesData!: Employee[];
  role!: string;
  user!: string;

  private branchDataSubscription: Subscription | undefined;
  private productsDataSubscription: Subscription | undefined;
  private activitiesDataSubscription: Subscription | undefined;
  private salesDataSubscription: Subscription | undefined;

  constructor(private sharedApi: SharedApiService, private store: Store) {}

  ngDoCheck() {
    
    this.role = "admin";
    this.user = "admin";

    this.getBranchData();
    setTimeout(()=>{

      this.getProductsData();
    },1000);
    this.getBranchData();
    setTimeout(()=>{
     this.getActivitiesData();

    },2000);
    this.getBranchData();
    setTimeout(()=>{
      this.getSalesData();

    },3000)
  }

  ngOnDestroy() {
    this.unsubscribeFromSubscriptions();
  }

  private unsubscribeFromSubscriptions() {
    if (this.branchDataSubscription) {
      this.branchDataSubscription.unsubscribe();
    }
    if (this.productsDataSubscription) {
      this.productsDataSubscription.unsubscribe();
    }
    if (this.activitiesDataSubscription) {
      this.activitiesDataSubscription.unsubscribe();
    }
    if (this.salesDataSubscription) {
      this.salesDataSubscription.unsubscribe();
    }
  }

  getBranchData() {
    this.store.dispatch(branchDataActions.retrieveBranchData());
    this.branchDataSubscription = this.store.select(selectBranchData).subscribe((response) => {
      this.branchData = response;
    });
  }

  getProductsData() {
    this.store.dispatch(productsDataActions.retrieveProductsData());
    this.productsDataSubscription = this.store.select(selectProductsData).subscribe((response) => {
      this.productsData = response;
    });
  }

  getActivitiesData() {
    this.store.dispatch(activitiesDataActions.retrieveActivitiesData());
    this.activitiesDataSubscription = this.store.select(selectActivitiesData).subscribe((response) => {
      this.activitiesData = response;
    });
  }

  getSalesData() {
    this.store.dispatch(salesDataActions.retrieveSalesData());
    this.salesDataSubscription = this.store.select(selectSalesData).subscribe((response) => {
      this.salesData = response;
    });
  }
}
