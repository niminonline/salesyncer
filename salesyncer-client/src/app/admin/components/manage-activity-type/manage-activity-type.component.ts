import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { SharedApiService } from 'src/app/shared/services/shared-api.service';
import { AdminAPIService } from '../../services/admin-api.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { selectActivityTypesData } from 'src/app/shared/store/selectors/activityTypesData.selectors';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-manage-activity-type',
  templateUrl: './manage-activity-type.component.html',
  styleUrls: ['./manage-activity-type.component.scss'],
})
export class ManageActivityTypeComponent implements OnInit, OnDestroy  {
  activityTypesData!: any;
  displayedColumns = ['activityType', 'actions'];
  dataSource: any;
  _id!: string | null;
  showSpinner: boolean = false;


  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(
    private sharedApi: SharedApiService,
    private adminAPI: AdminAPIService,
    private router: Router,
    private store: Store
  ) {}

  private activityTypesSubscription: Subscription | undefined;

  ngOnInit() {
    this.activityTypesSubscription =  this.store.select(selectActivityTypesData).subscribe((response) => {
      this.activityTypesData=response;
      this.dataSource = new MatTableDataSource(this.activityTypesData);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
   
  }

  createActivityType() {
    Swal.fire({
      title: 'Enter activity type',
      html: '<input id="activityType" class="swal2-input" placeholder="Activity Type Name">',
      showCancelButton: true,
      confirmButtonText: 'Create',
      cancelButtonText: 'Cancel',
      focusConfirm: false,
      preConfirm: () => {
        const activityTypeElement = Swal.getPopup()?.querySelector(
          '#activityType'
        ) as HTMLInputElement;

        const activityType = activityTypeElement.value;

        if (!activityType) {
          Swal.showValidationMessage('Please fill the input field');
        }
        return { activityType };
      },
    }).then((result) => {
      if (result.isConfirmed) {
        this.adminAPI.createActivityType(result.value).subscribe((response) => {
          if (response.status !== 'OK') {
            Swal.fire({
              icon: 'error',
              title: 'Error',
              text: response.message,
            });
          } else {
            Swal.fire({
              position: 'center',
              icon: 'success',
              title: 'Activity type created successfully',
              showConfirmButton: false,
              timer: 1500,
            });

            const currentUrl = this.router.url;
            this.router
              .navigateByUrl('admin', { skipLocationChange: true })
              .then(() => {
                this.router.navigateByUrl(currentUrl);
              });
          }
        });
      }
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  editActivityType(_id: string) {
    const selectedType = this.activityTypesData.find((type: any) => {
      return type._id == _id;
    });
    // const currentBranch= ...selectedBranch;
    const currentType = selectedType.activityType;
    if (currentType) {
      Swal.fire({
        title: 'Update activity type details',
        html: `<input id="activityType" class="swal2-input" placeholder="Branch Code" value="${currentType}">`,
        showCancelButton: true,
        confirmButtonText: 'Update',
        cancelButtonText: 'Cancel',
        focusConfirm: false,
        preConfirm: () => {
          const activityTypeElement = Swal.getPopup()?.querySelector(
            '#activityType'
          ) as HTMLInputElement;

          const activityType = activityTypeElement.value;

          if (!activityType) {
            Swal.showValidationMessage('Please fill the input field');
          }
          return { activityType };
        },
      }).then((result) => {
        if (result.isConfirmed) {
          const data = {
            _id: _id,
            activityType: result.value.activityType,
          };
          this.adminAPI.editActivityType(data).subscribe((response) => {
            if (response.status !== 'OK') {
              Swal.fire({
                icon: 'error',
                title: 'Error',
                text: response.message,
              });
            } else {
              Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'Activity type updated successfully',
                showConfirmButton: false,
                timer: 1500,
              });

              const currentUrl = this.router.url;
              this.router
                .navigateByUrl('admin', { skipLocationChange: true })
                .then(() => {
                  this.router.navigateByUrl(currentUrl);
                });
            }
          });
        }
      });
    }

  }
  deleteActivityType(_id: string) {
    Swal.fire({
      title: 'Confirmation',
      text: `Are you sure to delete the activity type?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33  ',
      confirmButtonText: 'Yes',
    }).then((result) => {
      if (result.isConfirmed) {
        this.showSpinner = true;
        this.adminAPI.deleteActivityType(_id).subscribe((response) => {
          if (response.status == 'OK') {
            this.showSpinner = false;

            Swal.fire({
              position: 'center',
              icon: 'success',
              title: 'Activity type deleted successfully',
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


  ngOnDestroy() {
    if (this.activityTypesSubscription) {
      this.activityTypesSubscription.unsubscribe();
    }
  }
}
