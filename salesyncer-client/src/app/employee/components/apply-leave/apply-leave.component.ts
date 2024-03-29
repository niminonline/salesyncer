import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SharedApiService } from 'src/app/shared/services/shared-api.service';
import { EmployeeApiService } from '../../services/employee-api.service';
import { LeaveCategory } from 'src/app/shared/interfaces/interfaces';
import { selectEmployeeId } from '../../../shared/store/selectors/auth.selectors';
import { selectEmployeeData } from '../../../shared/store/selectors/user.selectors';
import { Store } from '@ngrx/store';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-apply-leave',
  templateUrl: './apply-leave.component.html',
  styleUrls: ['./apply-leave.component.scss'],
})
export class ApplyLeaveComponent implements OnInit {
  _id!: string | null;
  leaveForm!: FormGroup;
  leaveCategory!: Array<LeaveCategory>;
  employeeData!: any;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private sharedApi: SharedApiService,
    private empApi: EmployeeApiService,
    private store: Store
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
    this.getEmployeeData();
  }

  getEmpObject_id() {
    this.store.select(selectEmployeeId).subscribe((response) => {
      this._id = response;
    });
  }
  getLeaveCategory() {
    this.sharedApi.getLeaveCategory().subscribe((response) => {
      this.leaveCategory = response?.leaveCategory;
    });
  }

  getEmployeeData() {
    this.store.select(selectEmployeeData).subscribe((response) => {
      this.employeeData = response;
    });
  }

  onSubmit() {
    if (this.leaveForm.valid) {
      const remainingCasualLeaves = this.employeeData.casualLeaveBalance;
      const remainingSickLeaves = this.employeeData.sickLeaveBalance;

      const formData = this.leaveForm.value;
      formData._id = this._id;

      const { startDate, endDate, category } = formData;

      const fromDate = new Date(startDate);
      const toDate = new Date(endDate);
      let dayDifference =
        (toDate.getTime() - fromDate.getTime()) / (1000 * 60 * 60 * 24);
      if (startDate !== endDate) {
        dayDifference += 1;
      }
      if (category == 'Casual' && remainingCasualLeaves <= dayDifference) {
        Swal.fire('Error', 'Insufficient casual leave balance', 'error');
      } else if (category == 'Sick' && remainingSickLeaves <= dayDifference) {
        Swal.fire('Error', 'Insufficient sick leave balance', 'error');
      } else {
        this.empApi.applyLeave(formData).subscribe((response) => {
          if (response.status == 'OK') {
            Swal.fire({
              position: 'center',
              icon: 'success',
              title: 'Leave applied successfully',
              showConfirmButton: false,
              timer: 1500,
            });
            this.router.navigate(['leave']);
          } else {
            Swal.fire(response.status, response.message, 'error');
          }
        });
      }
    }
  }

  navLeave() {
    this.router.navigate(['leave']);
  }

  trackByLeaveCategory(index: number, leaveCategory: LeaveCategory): string {
    return leaveCategory._id; 
  }
}
