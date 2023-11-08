import { Component,OnInit, ViewChild  } from '@angular/core';
import { SharedApiService } from 'src/app/shared/services/shared-api.service';
import { AdminAPIService } from '../../services/admin-api.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { FormBuilder } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';

@Component({
  selector: 'app-manage-branch',
  templateUrl: './manage-branch.component.html',
  styleUrls: ['./manage-branch.component.scss'],
})
export class ManageBranchComponent implements OnInit {
   branchData!: any;
  displayedColumns = ['branchCode', 'branchName', 'location','actions'];
  dataSource: any;
  _id!: string | null;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(
    private sharedApi: SharedApiService,
    private adminAPI: AdminAPIService,
    private router: Router,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    this.sharedApi.getBranches().subscribe((response:any) => {
      this.branchData = response.branchData;
      this.dataSource= new MatTableDataSource(this.branchData);
      this.dataSource.paginator=this.paginator;
      this.dataSource.sort = this.sort;

     
    });
  }

  addBranch() {
    Swal.fire({
      title: 'Enter branch details',
      html:
        '<input id="branchCode" class="swal2-input" placeholder="Branch Code">' +
        '<input id="branchName" class="swal2-input" placeholder="Branch Name">' +
        '<input id="location" class="swal2-input" placeholder="Location">',
      showCancelButton: true,
      confirmButtonText: 'Add',
      cancelButtonText: 'Cancel',
      focusConfirm: false,
      preConfirm: () => {
        const branchCodeElement = Swal.getPopup()?.querySelector(
          '#branchCode'
        ) as HTMLInputElement;
        const branchNameElement = Swal.getPopup()?.querySelector(
          '#branchName'
        ) as HTMLInputElement;
        const locationElement = Swal.getPopup()?.querySelector(
          '#location'
        ) as HTMLInputElement;

        const branchCode = branchCodeElement.value;
        const branchName = branchNameElement.value;
        const location = locationElement.value;

        if (!branchCode || !branchName || !location) {
          Swal.showValidationMessage('Please fill in both input fields');
        }
        return { branchCode, branchName, location };
      },
    }).then((result) => {
      if (result.isConfirmed) {
        console.log(result.value);
        this.adminAPI.addBranch(result.value).subscribe((response) => {
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
              title: 'Branch created successfully',
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

  editBranch(_id:string){
    const selectedBranch=this.branchData.find((branch:any)=>{
     return  branch._id ==_id;
    }
) 
// const currentBranch= ...selectedBranch;
const currentBranchName= selectedBranch.branchName;
const currentBranchCode= selectedBranch.branchCode;
const currentBranchLocation=selectedBranch.location;
console.log(currentBranchCode,currentBranchName,currentBranchLocation)
if(selectedBranch){
  Swal.fire({
    title: 'Update branch details',
    html:
      `<input id="branchCode" class="swal2-input" placeholder="Branch Code" value="${currentBranchCode}">` +
      `<input id="branchName" class="swal2-input" placeholder="Branch Name" value="${currentBranchName}">` +
      `<input id="location" class="swal2-input" placeholder="Location" value="${currentBranchLocation}">`,
    showCancelButton: true,
    confirmButtonText: 'Update',
    cancelButtonText: 'Cancel',
    focusConfirm: false,
    preConfirm: () => {
      const branchCodeElement = Swal.getPopup()?.querySelector(
        '#branchCode'
      ) as HTMLInputElement;
      const branchNameElement = Swal.getPopup()?.querySelector(
        '#branchName'
      ) as HTMLInputElement;
      const locationElement = Swal.getPopup()?.querySelector(
        '#location'
      ) as HTMLInputElement;

      const branchCode = branchCodeElement.value;
      const branchName = branchNameElement.value;
      const location = locationElement.value;

      if (!branchCode || !branchName || !location) {
        Swal.showValidationMessage('Please fill in both input fields');
      }
      return { branchCode, branchName, location };
    },
  }).then((result) => {
    if (result.isConfirmed) {
      console.log(result.value);
      const data={
        _id:_id,
        branchCode:result.value.branchCode,
        branchName:result.value.branchName,
        location:result.value.location,
      }
      this.adminAPI.editBranch(data).subscribe((response) => {
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
            title: 'Branch updated successfully',
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


    // console.log(...selectedBranch)
  }
}
