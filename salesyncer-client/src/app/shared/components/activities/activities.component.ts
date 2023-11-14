import { Component, OnInit, ViewChild } from '@angular/core';
import { SharedApiService } from 'src/app/shared/services/shared-api.service';
import { Router } from '@angular/router';

import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

import { Store } from '@ngrx/store';
import * as activitiesDataActions from '../../../shared/store/actions/activitiesData.actions';
import * as ContactsActions from 'src/app/shared/store/actions/contacts.actions';
import * as activityTypesDataActions from '../../../shared/store/actions/activityTypesData.actions';
import * as leadsDataActions from '../../../shared/store/actions/leadsData.actions';
import * as employeesDataActions from '../../../shared/store/actions/employeesData.actions';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-activities',
  templateUrl: './activities.component.html',
  styleUrls: ['./activities.component.scss'],
})
export class ActivitiesComponent implements OnInit {
  allActivitiesCount: any;
  missedActivitiesCount: any;
  todaysActivitiesCount: any;
  upcomingActivitiesCount: any;
  activitiesData!: any;
  showSpinner: boolean = false;

  dataSource!: MatTableDataSource<any>;
  displayedColumns: string[] = [
    'activityId',
    'leadId',
    'clientName',
    'type',
    'status',
    'scheduledActivity',
    'scheduledTime',
    'actions',
  ];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  todaysActivities: any;
  upcomingActivities: any;
  missedActivities: any;

  constructor(
    private sharedAPI: SharedApiService,
    private router: Router,
    private store: Store
  ) {}

  ngOnInit() {
    this.store.dispatch(activitiesDataActions.retrieveActivitiesData());
    this.store.dispatch(activityTypesDataActions.retrieveActivityTypesData());
    this.store.dispatch(leadsDataActions.retrieveLeadsData());
    this.store.dispatch(employeesDataActions.retrieveEmployeesData());



    this.sharedAPI.getActivities().subscribe((response) => {
      this.activitiesData = response.activitiesData.map((activity: any) => {
        const scheduledTime = new Date(activity.scheduledTime);
        return { ...activity, scheduledTime: scheduledTime };
      });
      this.allActivitiesCount = this.activitiesData.length;
      // this.activitiesData.map((activity:any)=>{
      //   console.log(activity.scheduledTime)
      // })

      this.dataSource = new MatTableDataSource(this.activitiesData);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;

      const today = new Date().setHours(0, 0, 0, 0);
      this.upcomingActivities = this.activitiesData.filter((activity: any) => {
        const currentScheduledTime = new Date(activity.scheduledTime).setHours(
          0,
          0,
          0,
          0
        );
        const timeDifference =
          (currentScheduledTime - today) / (1000 * 60 * 60 * 24);
        return (
          timeDifference < 3 &&
          today < currentScheduledTime &&
          activity.status !== 'Completed'
        );
      });
      this.upcomingActivitiesCount = this.upcomingActivities.length;
      this.todaysActivities = this.activitiesData.filter((activity: any) => {
        const currentScheduledTime = new Date(activity.scheduledTime).setHours(
          0,
          0,
          0,
          0
        );
        return currentScheduledTime == today && activity.status !== 'Completed';
      });
      this.todaysActivitiesCount = this.todaysActivities.length;

      this.missedActivities = this.activitiesData.filter((activity: any) => {
        const currentScheduledTime = new Date(activity.scheduledTime).setHours(
          0,
          0,
          0,
          0
        );
        return currentScheduledTime < today && activity.status !== 'Completed';
      });
      this.missedActivitiesCount = this.missedActivities.length;
    });
  }

  // ngAfterViewInit() {
  //   this.dataSource.paginator = this.paginator;
  //   this.dataSource.sort = this.sort;
  // }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  navCreateActivity() {
    const currentroute = this.router.url;
    if (currentroute.toString().includes('admin')) {
      this.router.navigate(['admin/activities-create']);
    } else {
      this.router.navigate(['activities-create']);
    }
  }

  navEditActivity(_id: string) {
    const currentroute = this.router.url;
    if (currentroute.toString().includes('admin')) {
      this.router.navigate(['admin/activities-edit'], { queryParams: { _id } });
    } else {
      this.router.navigate(['activities-edit'], { queryParams: { _id } });
    }
  }
  navViewActivity(_id: string) {
    const currentroute = this.router.url;
    if (currentroute.toString().includes('admin')) {
      this.router.navigate(['admin/activities-view'], { queryParams: { _id } });
    } else {
      this.router.navigate(['activities-view'], { queryParams: { _id } });
    }
  }

  deleteActivity(_id: string) {
    Swal.fire({
      title: 'Confirmation',
      text: `Are you sure to delete the activity?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33  ',
      confirmButtonText: 'Yes',
    }).then((result) => {
      if (result.isConfirmed) {
        this.showSpinner = true;
        this.sharedAPI.deleteActivity(_id).subscribe((response) => {
          if (response.status == 'OK') {
            this.showSpinner = false;
            this.store.dispatch(ContactsActions.retrieveContactsData());

            Swal.fire({
              position: 'center',
              icon: 'success',
              title: 'Activity deleted successfully',
              showConfirmButton: false,
              timer: 1500,
            });

            const currentUrl = this.router.url;
            if (currentUrl.toString().includes('admin')) {
              this.router
                .navigateByUrl('admin', { skipLocationChange: true })
                .then(() => {
                  this.router.navigate(['admin/activities']);
                });
            } else {
              this.router
                .navigateByUrl('', { skipLocationChange: true })
                .then(() => {
                  this.router.navigate(['activities']);
                });
            }
          } else {
            this.showSpinner = false;
            Swal.fire(response.status, response.message, 'error');
          }
        });
      }
    });
  }

  filterAllActivities() {
    this.dataSource = new MatTableDataSource(this.activitiesData);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  filterUpcomingActivities() {
    this.dataSource = new MatTableDataSource(this.upcomingActivities);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  filterTodaysActivities() {
    this.dataSource = new MatTableDataSource(this.todaysActivities);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  filterMissedActivities() {
    this.dataSource = new MatTableDataSource(this.missedActivities);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
}
