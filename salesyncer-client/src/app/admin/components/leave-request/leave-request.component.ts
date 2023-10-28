import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { SharedApiService } from 'src/app/shared/services/shared-api.service';
import { Router } from '@angular/router';
import { AdminAPIService } from '../../services/admin-api.service';

import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-leave-request',
  templateUrl: './leave-request.component.html',
  styleUrls: ['./leave-request.component.scss'],
})
export class LeaveRequestComponent implements OnInit {
  tableData!: any[];
  dataSource!: MatTableDataSource<any>;
  showSpinner: boolean = false;


  displayedColumns: string[] = [
    'name',
    'role',
    'branch',
    'startDate',
    'endDate',
    'leavecategory',
    'reason',
    'appliedDate',
    'actions',
  ];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
    @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private sharedAPI: SharedApiService,
    private router: Router,
    private adminApi: AdminAPIService
  ) {}

  ngOnInit() {
    this.getLeaveRequests();
  }

  getLeaveRequests() {
    this.sharedAPI.leaveRequests().subscribe((response) => {
      this.tableData = response.leaveRequests;
      console.log(this.tableData);
      this.dataSource = new MatTableDataSource(this.tableData);
      this.dataSource.paginator=this.paginator;
      this.dataSource.sort = this.sort;

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
          console.log(response);
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

  rejectLeave(_id: string) {
    this.adminApi.leaveAction({ _id, toDo: 'reject' }).subscribe((response) => {
      console.log(response);
    });
  }
}
