import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { SharedApiService } from 'src/app/shared/services/shared-api.service';
import { Router } from '@angular/router';
import { AdminAPIService } from '../../services/admin-api.service';

import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import Swal from 'sweetalert2';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-leave-request',
  templateUrl: './leave-request.component.html',
  styleUrls: ['./leave-request.component.scss'],
})
export class LeaveRequestComponent implements OnInit, OnDestroy {
  displayedColumns: string[] = [
    'name',
    'designation',
    'branch',
    'startDate',
    'endDate',
    'leavecategory',
    'reason',
    'appliedDate',
    'requestType',
    'actions',
  ];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  leaveRequestData!: any[];
  cancelRequestData!: any[];
  leaveRequestCount!: number;
  cancelRequestCount!: number;
  allRequestCount!: number;
  requestType!: string;
  leavesData!: any;
  dataSource!: MatTableDataSource<any>;
  showSpinner: boolean = false;

  private leaveRequestSubscription: Subscription | undefined;

  constructor(
    private sharedAPI: SharedApiService,
    private router: Router,
    private adminApi: AdminAPIService
  ) {}

  ngOnInit() {
    this.leaveRequestSubscription = this.sharedAPI.leaveRequests().subscribe((response) => {
      this.leavesData = response.leaveRequests;
      this.allRequestCount = this.leavesData.length;
      this.leavesData.map((leaveData: any) => {
        if (leaveData?.status == 'Pending') {
          leaveData.requestType = 'Leave Request';
        } else if (leaveData?.status == 'Cancellation Requested') {
          leaveData.requestType = 'Cancellation Request';
        }
      });
      this.leaveRequestData = this.leavesData.filter(
        (leaveData: any) => leaveData.status == 'Pending'
      );
      this.leaveRequestCount = this.leaveRequestData.length;
      this.cancelRequestData = this.leavesData.filter(
        (leaveData: any) => leaveData.status == 'Cancellation Requested'
      );
      this.cancelRequestCount = this.cancelRequestData.length;
      this.dataSource = new MatTableDataSource(this.leavesData);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  ngOnDestroy() {
    if (this.leaveRequestSubscription) {
      this.leaveRequestSubscription.unsubscribe();
    }
  }

  filterAllRequest() {
    this.dataSource = new MatTableDataSource(this.leavesData);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  filterLeaveRequest() {
    const leaveRequests = this.leavesData.filter(
      (leaveData: any) => leaveData.status == 'Pending'
    );
    this.dataSource = new MatTableDataSource(leaveRequests);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  filterCancelRequest() {
    const cancelRequests = this.leavesData.filter(
      (leaveData: any) => leaveData.status == 'Cancellation Requested'
    );
    this.dataSource = new MatTableDataSource(cancelRequests);
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

  leaveAction(_id: string, toDo: string) {
    Swal.fire({
      title: 'Confirmation',
      text: `Are you sure to ${toDo} the request?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33  ',
      confirmButtonText: 'Yes',
    }).then((result) => {
      if (result.isConfirmed) {
        this.showSpinner = true;
        this.adminApi.leaveAction({ _id, toDo }).subscribe((response) => {
          if (response.status == 'OK') {
            this.showSpinner = false;
            Swal.fire({
              position: 'center',
              icon: 'success',
              title: response.message,
              showConfirmButton: false,
              timer: 1500,
            });

            const currentUrl = this.router.url;
            this.router
              .navigateByUrl('admin', { skipLocationChange: true })
              .then(() => {
                this.router.navigateByUrl(currentUrl);
              });
          } else {
            this.showSpinner = false;
            Swal.fire(response.status, response.message, 'error');
          }
        });
      }
    });
  }
}
