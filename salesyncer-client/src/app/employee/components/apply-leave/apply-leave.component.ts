import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SharedApiService } from 'src/app/shared/services/shared-api.service';
import { EmployeeApiService } from '../../services/employee-api.service';
import { LeaveCategory } from 'src/app/shared/interfaces/interfaces';
import { selectEmployeeId } from '../../store/selectors/auth.selectors';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-apply-leave',
  templateUrl: './apply-leave.component.html',
  styleUrls: ['./apply-leave.component.scss'],
})
export class ApplyLeaveComponent implements OnInit {
  _id!:string|null;
  leaveForm!: FormGroup;
  leaveCategory!: Array<LeaveCategory>;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private sharedApi: SharedApiService,
    private empApi: EmployeeApiService,
    private store:Store
  ) {}

  ngOnInit(): void {

    this.getEmpObject_id();

      
    
    this.getLeaveCategory();

    this.leaveForm = this.formBuilder.group({
      startDate: ['', [Validators.required]],
      endDate: ['', [Validators.required]],
      category: ['', [Validators.required]],
      reason: ['', [Validators.required]],
    });
  }


  getEmpObject_id(){

    this.store.select(selectEmployeeId).subscribe((response)=>{
      this._id= response;
      // console.log("id==",this._id)
    })
    

  }
  getLeaveCategory() {
    this.sharedApi.getLeaveCategory().subscribe((response) => {
      this.leaveCategory = response?.leaveCategory;
      // console.log(this.leaveCategory);
    });
  }

  onSubmit() {
    if (this.leaveForm.valid) {
      const formData = this.leaveForm.value;
      formData._id= this._id;
      // console.log(formData);

      this.empApi.applyLeave(formData).subscribe((response)=>{
        console.log(response);
      })
    }
  }

  navLeave() {
    this.router.navigate(['leave']);
  }
}
