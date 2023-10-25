import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { selectEmployeeId } from '../../store/selectors/auth.selectors';
import { Store } from '@ngrx/store';
import { SharedApiService } from 'src/app/shared/services/shared-api.service';

@Component({
  selector: 'app-leave',
  templateUrl: './leave.component.html',
  styleUrls: ['./leave.component.scss'],
})
export class LeaveComponent implements OnInit {
  _id!: string | null;
  leaveFilterForm!: FormGroup;

  displayedColumns!:Object[] ;
  tableData!: any;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private sharedApi: SharedApiService,
    private store: Store
  ) {}

  ngOnInit(): void {

    this.displayedColumns = [
      {
        name: 'Start date',
        property: 'startDate',
        sortable: 'startDateSortable',
      },
      {
        name: 'End Date',
        property: 'endDate',
        sortable: 'endDateSortable',
      },
      {
        name: 'Reason',
        property: 'reason',
        sortable: 'reasonortable',
      },
      {
        name: 'Leave Category',
        property: 'leaveCategory',
        sortable: 'leaveCategorySortable',
      },
      {
        name: 'Status',
        property: 'status',
        sortable: 'statusSortable',
      },
      {
        name: 'Applied Date',
        property: 'appliedDate',
        sortable: 'appliedDateSortable',
      },
      // { name: 'Actions', property: 'actions' },
    ];


    this.getEmpObject_id();


    this.leaveFilterForm = this.formBuilder.group({
      startDate: ['', [Validators.required]],
      endDate: ['', [Validators.required]],
     
    });


  }

  onSubmit() {
    if (this.leaveFilterForm.valid) {
      const formData = this.leaveFilterForm.value;
      formData._id= this._id;
      this.sharedApi.fetchLeaveData(formData).subscribe((response)=>{
        this.tableData=response.leaveData;
        console.log("RESp",this.tableData)
      })

    }
  }


  getEmpObject_id() {
    this.store.select(selectEmployeeId).subscribe((response) => {
      this._id = response;
      // console.log("id==",this._id)
    });
  }

  navAppyLeave() {
    this.router.navigate(['apply-leave']);
  }
}
