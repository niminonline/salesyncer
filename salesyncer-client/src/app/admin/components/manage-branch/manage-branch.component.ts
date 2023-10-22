import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { SharedApiService } from 'src/app/shared/services/shared-api.service';
import { TableComponent } from 'src/app/shared/components/table/table.component';
import { AdminAPIService } from '../../services/admin-api.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-manage-branch',
  templateUrl: './manage-branch.component.html',
  styleUrls: ['./manage-branch.component.scss'],
})
export class ManageBranchComponent implements OnInit {
  branchData!: any;
  tableData!: any;
  displayedColumns!: any;

  //   actions=`<button mat-icon-button color="primary" aria-label="edit_icon">
  //   <mat-icon>home</mat-icon>
  // </button>`

  @ViewChild(TableComponent) branchTable!: TableComponent;
  constructor(private sharedApi: SharedApiService,private adminAPI:AdminAPIService,private router:Router) {}

  ngOnInit() {
    this.sharedApi.getBranches().subscribe((response) => {
      this.branchData = response;

      // this.branchData.branchData.forEach((item: any) => {
      //   item.actions = this.actions;
      // });

      // console.log('dataaa', this.branchData);
      this.tableData = this.branchData.branchData;

      this.displayedColumns = [
        {
          name: 'Branch Code',
          property: 'branchCode',
          sortable: 'branchCodeSortable',
        },
        {
          name: 'Branch Name',
          property: 'branchName',
          sortable: 'branchNameSortable',
        },
        {
          name: 'Location',
          property: 'location',
          sortable: 'locationSortable',
        },
        // { name: 'Actions', property: 'actions' },
      ];
    });
  }

  addBranch(){
 
    Swal.fire({
      title: 'Enter branch details',
      html:
        '<input id="branchCode" class="swal2-input" placeholder="Branch Code">' +
        '<input id="branchName" class="swal2-input" placeholder="Branch Name">'+
        '<input id="location" class="swal2-input" placeholder="Location">',
      showCancelButton: true,
      confirmButtonText: 'Add',
      cancelButtonText: 'Cancel',
      focusConfirm: false,
      preConfirm: () => {
        const branchCodeElement = Swal.getPopup()?.querySelector('#branchCode') as HTMLInputElement;
        const branchNameElement = Swal.getPopup()?.querySelector('#branchName') as HTMLInputElement;
        const locationElement = Swal.getPopup()?.querySelector('#location') as HTMLInputElement;
  
        const branchCode = branchCodeElement.value;
        const branchName = branchNameElement.value;
        const location = locationElement.value;
  
        if (!branchCode || !branchName || !location) {
          Swal.showValidationMessage('Please fill in both input fields');
        }
        return { branchCode, branchName,location };
      },
    }).then((result) => {
      if (result.isConfirmed) {
        console.log(result.value);
        this.adminAPI.addBranch(result.value).subscribe((response)=>{
          if(response.status!=="OK"){
            Swal.fire({
              icon: 'error',
              title: 'Error',
              text: response.message,
            
            });
          }
          else{

            const currentUrl = this.router.url;
            this.router
              .navigateByUrl('admin', { skipLocationChange: true })
              .then(() => {
                this.router.navigateByUrl(currentUrl);
              });
           
          }
        })

       
      }
    });
  }
  


}

