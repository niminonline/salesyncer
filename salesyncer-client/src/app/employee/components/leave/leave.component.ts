import {Component,OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { selectEmployeeId } from '../../store/selectors/auth.selectors';
import { Store } from '@ngrx/store';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import { SharedApiService } from 'src/app/shared/services/shared-api.service';
import { MatTableDataSource } from '@angular/material/table';
import { EmployeeApiService } from '../../services/employee-api.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-leave',
  templateUrl: './leave.component.html',
  styleUrls: ['./leave.component.scss'],
})
export class LeaveComponent implements OnInit {
  _id!: string | null;
  leaveFilterForm!: FormGroup;

  displayedColumns!: Object[];
  leavesData!: any;
  dataSource: any;
  showSpinner: boolean = false;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private sharedApi: SharedApiService,
    private store: Store,
    private employeeApi: EmployeeApiService
  ) {}

  ngOnInit(): void {
    this.displayedColumns = [
      'startDate',
      'endDate',
      'reason',
      'leaveCategory',
      'status',
      'appliedDate',
      'actions',
    ];

    this.getEmpObject_id();

    this.leaveFilterForm = this.formBuilder.group({
      startDate: ['', [Validators.required]],
      endDate: ['', [Validators.required]],
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  onSubmit() {
    if (this.leaveFilterForm.valid) {
      const formData = this.leaveFilterForm.value;
      formData._id = this._id;
      this.sharedApi.fetchLeaveData(formData).subscribe((response: any) => {
        const currentEmpLeavesData = response.leavesData.filter(
          (leaveData: any) => leaveData.employee.toString() == this._id
        );
        this.leavesData = currentEmpLeavesData.map((item: any) => ({
          ...item,
          startDate: new Date(item.startDate).toLocaleDateString('en-IN', {
            day: '2-digit',
            month: 'numeric',
            year: 'numeric',
            weekday: 'short',
          }),
          endDate: new Date(item.endDate).toLocaleDateString('en-IN', {
            day: '2-digit',
            month: 'numeric',
            year: 'numeric',
            weekday: 'short',
          }),
          appliedDate: new Date(item.appliedDate).toLocaleDateString('en-IN', {
            day: '2-digit',
            month: 'numeric',
            year: 'numeric',
          }),
        }));
        this.dataSource = new MatTableDataSource(this.leavesData);
        this.dataSource.paginator=this.paginator;
        this.dataSource.sort = this.sort;

      });
    }
  }

  getEmpObject_id() {
    this.store.select(selectEmployeeId).subscribe((response) => {
      this._id = response;
    });
  }

  navAppyLeave() {
    this.router.navigate(['apply-leave']);
  }

  cancelLeave(_id: string) {
    Swal.fire({
      title: 'Confirmation',
      text: `Are you sure to cancel the leave?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33  ',
      confirmButtonText: 'Yes',
    }).then((result) => {
      if (result.isConfirmed) {
        this.showSpinner = true;

        this.employeeApi.cancelLeave(_id).subscribe((response) => {
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
              .navigateByUrl('/', { skipLocationChange: true })
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
