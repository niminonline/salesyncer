import { Component, OnInit } from '@angular/core';
import * as branchDataActions from '../../../shared/store/actions/branchData.actions';
import * as leadsDataActions from '../../../shared/store/actions/leadsData.actions';
import * as leadSourceDataActions from '../../../shared/store/actions/leadSourceData.actions';
import { selectBranchData } from '../../../shared/store/selectors/branchData.selectors';
import { selectLeadsData } from '../../../shared/store/selectors/leadsData.selectors';
import { selectLeadSourceData } from '../../../shared/store/selectors/leadSourceData.selectors';
import { SharedApiService } from 'src/app/shared/services/shared-api.service';
import { BranchData } from 'src/app/shared/interfaces/interfaces';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-employee-dashboard',
  templateUrl: './employee-dashboard.component.html',
  styleUrls: ['./employee-dashboard.component.scss'],
})
export class EmployeeDashboardComponent implements OnInit {
  branchData!: BranchData;
  constructor(private sharedApi: SharedApiService, private store: Store) {}

  ngOnInit() {
    this.getBranchData();
    this.getLeadsData();
    this.getLeadSourceData();
  }

  getBranchData() {
    this.store.dispatch(branchDataActions.retrieveBranchData());
    this.store.select(selectBranchData).subscribe((response) => {
      console.log(response);
    });
  }

  getLeadsData() {
    this.store.dispatch(leadsDataActions.retrieveLeadsData());
    this.store.select(selectLeadsData).subscribe((response) => {
      console.log(response);
    });
  }
  getLeadSourceData() {
    this.store.dispatch(leadSourceDataActions.retrieveLeadSourceData());
    this.store.select(selectLeadSourceData).subscribe((response) => {
      console.log(response);
    });
  }
}
