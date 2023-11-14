import { Component, OnInit  } from '@angular/core';
import * as branchDataActions from '../../../shared/store/actions/branchData.actions';
import { selectBranchData } from '../../../shared/store/selectors/branchData.selectors';
import { SharedApiService } from 'src/app/shared/services/shared-api.service';
import { BranchData } from 'src/app/shared/interfaces/interfaces';
import { Store } from '@ngrx/store';


@Component({
  selector: 'app-employee-dashboard',
  templateUrl: './employee-dashboard.component.html',
  styleUrls: ['./employee-dashboard.component.scss']
})
export class EmployeeDashboardComponent implements OnInit{

  branchData!:BranchData;
constructor(private sharedApi:SharedApiService, private store:Store){}


  ngOnInit(){

    this.getBranchData();
    }

    getBranchData(){
      this.store.dispatch(branchDataActions.retrieveBranchData());
      this.store.select(selectBranchData).subscribe((response)=>{
        console.log(response);
      })

    }
}
