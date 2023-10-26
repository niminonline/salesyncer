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
        // this.tableData=response.leaveData;
        console.log("RESp",this.tableData);


        this.tableData = response.leaveData.map((item: any) => ({
          ...item,
          startDate: new Date(item.startDate).toLocaleDateString('en-IN',{day:'2-digit',month:'numeric',year:'numeric',weekday: 'short'}),
          endDate: new Date(item.endDate).toLocaleDateString('en-IN',{day:'2-digit',month:'numeric',year:'numeric',weekday: 'short'}),
          appliedDate:  new Date(item.appliedDate).toLocaleDateString('en-IN',{day:'2-digit',month:'numeric',year:'numeric'})
        }));
        console.log("New date", this.tableData)



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
