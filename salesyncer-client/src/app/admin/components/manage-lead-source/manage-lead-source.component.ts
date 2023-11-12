import { Component, OnInit, ViewChild } from '@angular/core';
import { SharedApiService } from 'src/app/shared/services/shared-api.service';
import { AdminAPIService } from '../../services/admin-api.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
@Component({
  selector: 'app-manage-lead-source',
  templateUrl: './manage-lead-source.component.html',
  styleUrls: ['./manage-lead-source.component.scss'],
})
export class ManageLeadSourceComponent implements OnInit {
  leadSourceData!: any;
  displayedColumns = ['leadSource', 'actions'];
  dataSource: any;
  _id!: string | null;

  showSpinner: boolean = false;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(
    private sharedApi: SharedApiService,
    private adminAPI: AdminAPIService,
    private router: Router
  ) {}

  ngOnInit() {
    this.sharedApi.getLeadSource().subscribe((response: any) => {
      this.leadSourceData = response.leadSourceData;
      this.dataSource = new MatTableDataSource(this.leadSourceData);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  createLeadSource() {
    Swal.fire({
      title: 'Enter Lead Source',
      html: '<input id="leadSource" class="swal2-input" placeholder="Lead Source Name">',
      showCancelButton: true,
      confirmButtonText: 'Create',
      cancelButtonText: 'Cancel',
      focusConfirm: false,
      preConfirm: () => {
        const leadSourceElement = Swal.getPopup()?.querySelector(
          '#leadSource'
        ) as HTMLInputElement;

        const leadSource = leadSourceElement.value;

        if (!leadSource) {
          Swal.showValidationMessage('Please fill the input field');
        }
        return { leadSource };
      },
    }).then((result) => {
      if (result.isConfirmed) {
        this.adminAPI.createLeadSource(result.value).subscribe((response) => {
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
              title: 'Lead Source created successfully',
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

  editLeadSource(_id: string) {
    const selectedSource = this.leadSourceData.find((type: any) => {
      return type._id == _id;
    });
    // const currentBranch= ...selectedBranch;
    const currentSource = selectedSource.leadSource;
    if (currentSource) {
      Swal.fire({
        title: 'Update lead source details',
        html: `<input id="leadSource" class="swal2-input" placeholder="Lead Source" value="${currentSource}">`,
        showCancelButton: true,
        confirmButtonText: 'Update',
        cancelButtonText: 'Cancel',
        focusConfirm: false,
        preConfirm: () => {
          const leadSourceElement = Swal.getPopup()?.querySelector(
            '#leadSource'
          ) as HTMLInputElement;

          const leadSource = leadSourceElement.value;

          if (!leadSource) {
            Swal.showValidationMessage('Please fill the input field');
          }
          return { leadSource };
        },
      }).then((result) => {
        if (result.isConfirmed) {
          const data = {
            _id: _id,
            leadSource: result.value.leadSource,
          };
          this.adminAPI.editLeadSource(data).subscribe((response) => {
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
                title: 'Lead source updated successfully',
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
            {
            }
          });
        }
      });
    }
  }

  deleteLeadSource(_id: string) {
    Swal.fire({
      title: 'Confirmation',
      text: `Are you sure to delete the lead source?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33  ',
      confirmButtonText: 'Yes',
    }).then((result) => {
      if (result.isConfirmed) {
        this.showSpinner = true;
        this.adminAPI.deleteLeadSource(_id).subscribe((response) => {
          if (response.status == 'OK') {
            this.showSpinner = false;

            Swal.fire({
              position: 'center',
              icon: 'success',
              title: 'Lead source deleted successfully',
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
