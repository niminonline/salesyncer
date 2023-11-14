import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { SharedApiService } from 'src/app/shared/services/shared-api.service';
import { selectActivityTypesData } from 'src/app/shared/store/selectors/activityTypesData.selectors';

import { Store } from '@ngrx/store';
import { selectEmployeeData } from '../../store/selectors/user.selectors';
import * as UserActions from '../../store/actions/user.actions';
import { ActivityType, Employee, Lead } from '../../interfaces/interfaces';
import { selectEmployeesData } from '../../store/selectors/employeesData.selectors';
import { selectLeadsData } from '../../store/selectors/leadsData.selectors';

@Component({
  selector: 'app-activities-create',
  templateUrl: './activities-create.component.html',
  styleUrls: ['./activities-create.component.scss'],
})
export class ActivitiesCreateComponent implements OnInit {
  employeesData!: Employee[];
  currentOwner!: string;
  submitted: boolean = false;
  inputGroup!: FormGroup;
  showSpinner: boolean = false;
  leadsData!: Lead[];
  activityTypes!: any;
  hours: string[] = Array.from({ length: 24 }, (_, i) =>
    i.toString().padStart(2, '0')
  );
  minutes: string[] = Array.from({ length: 60 }, (_, i) =>
    i.toString().padStart(2, '0')
  );
  scheduledTime!: any;
  _id!: string;
  activityTypesData!: ActivityType[] ;
  constructor(
    private sharedAPI: SharedApiService,
    private fb: FormBuilder,
    private router: Router,
    private store: Store
  ) {}

  ngOnInit() {
    this.getEmployeesData();
    this.getLeadsData();
    this.getActivityTypesData();

    // this.initFormgroup();
  }

  getEmployeesData() {
      this.store.select(selectEmployeesData).subscribe((response) => {
       this.employeesData=response;
      });
      
    this.store.dispatch(UserActions.retrieveEmployeeData());

    this.store.select(selectEmployeeData).subscribe((response) => {
      if (response) {
        this.currentOwner = response.name;
      }
      this.initFormgroup();
    });
  }

  getLeadsData() {
    this.store.select(selectLeadsData).subscribe((response) => {
     this.leadsData=response;
    });
  }

  getActivityTypesData() {
    this.store.select(selectActivityTypesData).subscribe((response) => {
     this.activityTypesData=response;
    });
  }


  initFormgroup() {
    this.inputGroup = this.fb.group({
      lead: ['', [Validators.required]],
      type: ['', [Validators.required]],
      status: ['', [Validators.required]],
      owner: [this.currentOwner, [Validators.required]],
      scheduledActivity: [''],
      date: [''],
      hour: [''],
      minute: [''],
      feedback: [''],
    });
  }

  submitForm(data: any): void {
    this.submitted = true;

    if (!data.invalid) {
      this.showSpinner = true;

      if (data.value.scheduledActivity !== '') {
        const dateInput = data.value.date;
        const year = dateInput.getFullYear();
        const month = dateInput.getMonth();
        const day = dateInput.getDate();
        const inputHour = parseInt(data.value.hour, 10);
        const inputMinute = parseInt(data.value.minute, 10);
        this.scheduledTime = new Date(year, month, day, inputHour, inputMinute);
      }

      const { lead, owner, scheduledActivity, status, type, feedback } =
        data.value;
      const body = {
        lead,
        owner,
        scheduledActivity,
        scheduledTime: this.scheduledTime,
        status,
        type,
        feedback,
      };
      this.sharedAPI.createActivity(body).subscribe((response) => {
        if (response && response.status !== 'OK') {
          this.showSpinner = false;
          Swal.fire('Error', response.message, 'error');
        } else {
          this.showSpinner = false;
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Activity created successfully',
            showConfirmButton: false,
            timer: 1500,
          });
          const currentroute = this.router.url;
          if (currentroute.toString().includes('admin')) {
            this.router.navigate(['admin/activities']);
          } else {
            this.router.navigate(['activities']);
          }
        }
      });
    } else {
      Swal.fire('Error', 'Please fill the fields without errors', 'error');
    }
  }

  navActivities(event: Event) {
    event.preventDefault();

    const currentroute = this.router.url;
    if (currentroute.toString().includes('admin')) {
      this.router.navigate(['admin/activities']);
    } else {
      this.router.navigate(['activities']);
    }
  }
}
