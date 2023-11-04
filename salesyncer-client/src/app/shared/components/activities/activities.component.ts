import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { SharedApiService } from 'src/app/shared/services/shared-api.service';
import { Router } from '@angular/router';

import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

import { Store } from '@ngrx/store';
import * as ContactsActions from 'src/app/employee/store/actions/contacts.actions ';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-activities',
  templateUrl: './activities.component.html',
  styleUrls: ['./activities.component.scss']
})
export class ActivitiesComponent implements OnInit, AfterViewInit  {

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

  constructor(
    private sharedAPI: SharedApiService,
    private router: Router,
    private store: Store
  ) {}

  ngOnInit() {

    this.sharedAPI.getActivities().subscribe((response)=>{
      this.activitiesData= response.activitiesData;
      this.dataSource = new MatTableDataSource(this.activitiesData);
      this.dataSource.paginator=this.paginator;
      this.dataSource.sort = this.sort;
    })
     }

 

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

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
    this.sharedAPI.deleteLead(_id).subscribe((response)=>{
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
        
        
        const currentroute= this.router.url;
        if(currentroute.toString().includes('admin'))
        {
         this.router.navigate(['admin/activities']);
        }
        else{
          this.router.navigate(['activities']);
        }
      } else {
        this.showSpinner = false;
        Swal.fire(response.status, response.message, 'error');
      }

    })
  }

  })
}
}
