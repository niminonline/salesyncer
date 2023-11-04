import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { ActivatedRoute, Router } from '@angular/router';
import { SharedApiService } from 'src/app/shared/services/shared-api.service';

import { Store } from '@ngrx/store';
import { selectEmployeeData } from '../../../employee/store/selectors/user.selectors';
import * as UserActions from '../../../employee/store/actions/user.actions';

@Component({
  selector: 'app-activities-edit',
  templateUrl: './activities-edit.component.html',
  styleUrls: ['./activities-edit.component.scss'],
})
export class ActivitiesEditComponent implements OnInit {
  employeesData!: any;
  currentOwner!: string;
  submitted: boolean = false;
  inputGroup!: FormGroup;
  showSpinner: boolean = false;
  leadsData!: any;
  activityTypes!: any;
  hours: string[] = Array.from({ length: 24 }, (_, i) =>
    i.toString().padStart(2, '0')
  );
  minutes: string[] = Array.from({ length: 60 }, (_, i) =>
    i.toString().padStart(2, '0')
  );

  leadId!: string;
  owner!: string;
  scheduledActivity!: string;
  scheduledTime!: any;
  status!: string;
  type!: string;
  feedback!: string;
  hourToDisplay!: number;
  minuteToDisplay!: number;
  dateToDisplay!: string;
  scheduledTimeToDisplay!: string;
  activityData!: any;
  _id!: string | null;

  constructor(
    private sharedAPI: SharedApiService,
    private fb: FormBuilder,
    private router: Router,
    private store: Store,
    private activatedRouter: ActivatedRoute
  ) {
    this._id = this.activatedRouter.snapshot.queryParamMap.get('_id');
    console.log('ID=', this._id);

    this.inputGroup = this.fb.group({
      lead: ['', [Validators.required]],
      type: ['', [Validators.required]],
      status: ['', [Validators.required]],
      owner: ['', [Validators.required]],
      scheduledActivity: [''],
      date: [''],
      hour: [''],
      minute: [''],
      feedback: [''],
    });
  }

  ngOnInit() {
    this.getEmployeesData();
    this.getLeadsData();
    this.getActivityTypes();
    this.getActivityData();

    // this.initFormgroup();
  }

  getEmployeesData() {
    this.sharedAPI.getEmployeesData().subscribe((response) => {
      if (response) {
        this.employeesData = response.employeesData;
        console.log('Owner list loaded');
      }
    });
    this.store.dispatch(UserActions.retrieveEmployeeData());

    this.store.select(selectEmployeeData).subscribe((response) => {
      if (response) {
        this.currentOwner = response.name;
        console.log('Current owner data loaded');
      }
      // this.initFormgroup();
    });
  }

  getLeadsData() {
    this.sharedAPI.getLeads().subscribe((response) => {
      this.leadsData = response.leadsData;
      console.log('leads-data', this.leadsData);
    });
  }

  getActivityTypes() {
    this.sharedAPI.getActivityTypes().subscribe((response) => {
      this.activityTypes = response.activityTypes;
      console.log(this.activityTypes);
    });
  }

  getActivityData() {
    this.sharedAPI.getActivity(this._id).subscribe((response) => {
      this.activityData = response.activityData;

      console.log('Activity data fetched', this.activityData);
      this.leadId = this.activityData.lead._id;

      this.owner = this.activityData.lead.owner;
      this.scheduledActivity = this.activityData.scheduledActivity;
      this.scheduledTimeToDisplay = this.activityData.scheduledTime;
      this.status = this.activityData.status;
      this.type = this.activityData.type;
      this.feedback = this.activityData.feedback;
      const date = new Date(this.scheduledTimeToDisplay);

      this.hourToDisplay = date.getHours();
      this.minuteToDisplay = date.getMinutes();
      this.dateToDisplay =
        date.getMonth() + 1 + '/' + date.getDate() + '/' + date.getFullYear();
      console.log('date----', this.dateToDisplay);
      // console.log(this.scheduledTime)

      this.initFormgroup();
    });
  }

  initFormgroup() {
    this.inputGroup = this.fb.group({
      lead: [this.leadId, [Validators.required]],
      type: [this.type, [Validators.required]],
      status: [this.status, [Validators.required]],
      owner: [this.owner, [Validators.required]],
      scheduledActivity: [this.scheduledActivity],
      date: [this.scheduledTimeToDisplay],
      hour: [this.hourToDisplay.toString().padStart(2, '0')],
      minute: [this.minuteToDisplay.toString().padStart(2, '0')],
      feedback: [this.feedback],
    });
  }

  submitForm(data: any): void {
    this.submitted = true;

    // console.log('Data', data);
    console.log(data.value);
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
        console.log('Scheduled date', this.scheduledTime);
      } else {
        this.scheduledTime = '';
      }

      const { lead, owner, scheduledActivity, status, type, feedback } =
        data.value;
      const body = {
        _id: this._id,
        lead,
        owner,
        scheduledActivity,
        scheduledTime: this.scheduledTime,
        status,
        type,
        feedback,
      };
      console.log('Data', body);
      this.sharedAPI.editActivity(body).subscribe((response) => {
        // console.log(response);
        if (response && response.status !== 'OK') {
          this.showSpinner = false;
          Swal.fire('Error', response.message, 'error');
        } else {
          this.showSpinner = false;
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Activity updated successfully',
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
