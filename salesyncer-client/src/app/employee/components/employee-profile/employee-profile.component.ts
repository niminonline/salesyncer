import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import * as EmployeeActions from '../../../shared/store/actions/user.actions'
import Swal from 'sweetalert2';
import { selectEmployeeData } from '../../../shared/store/selectors/user.selectors';
import { EmployeeApiService } from '../../services/employee-api.service';

@Component({
  selector: 'app-employee-profile',
  templateUrl: './employee-profile.component.html',
  styleUrls: ['./employee-profile.component.scss'],
})
export class EmployeeProfileComponent implements OnInit {
  constructor(private store: Store,private router:Router, private empApi:EmployeeApiService) {}
  employeeData!: any;
  email!:string;

  ngOnInit(): void {
    this.refreshEmployeeData();
    this.getEmployeeData();
  }
refreshEmployeeData(){
  this.store.dispatch(EmployeeActions.retrieveEmployeeData());
}
  getEmployeeData() {
    this.store.select(selectEmployeeData).subscribe((employeeData) => {
      if (employeeData) {
        this.employeeData = employeeData;
        this.email=employeeData.email;

      } else {
        console.error('Employee fetching from state failed');
      }
    });
  }

  updatePassword(){



    Swal.fire({
      title: 'Update Password',
      html:
        '<input type="password"  id="currentPassword" class="swal2-input" placeholder="Current Password">' +
        '<input type="password"  id="newPassword" class="swal2-input" placeholder="New Password">' +
        '<input type="password"  id="confirmPassword" class="swal2-input" placeholder="Confirm Password">',
      showCancelButton: true,
      confirmButtonText: 'Update',
      cancelButtonText: 'Cancel',
      focusConfirm: false,
      preConfirm: () => {
        const currentPasswordElement = Swal.getPopup()?.querySelector(
          '#currentPassword'
        ) as HTMLInputElement;
        const newPasswordElement = Swal.getPopup()?.querySelector(
          '#newPassword'
        ) as HTMLInputElement;
        const confirmPasswordElement = Swal.getPopup()?.querySelector(
          '#confirmPassword'
        ) as HTMLInputElement;

        const currentPassword = currentPasswordElement.value;
        const newPassword = newPasswordElement.value;
        const confirmPassword = confirmPasswordElement.value;
        const email= this.email;

        if (!currentPassword || !newPassword || !confirmPassword) {
          Swal.showValidationMessage('Please fill all the fields');
        }
        else if(newPassword!==confirmPassword){
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: "New password and Confirm password doesn't match",
          });
          return;
        }
      
        return { currentPassword, newPassword, email };
      },
    }).then((result) => {
      console.log(result);
      if (result.isConfirmed) {
        this.empApi.updatePassword(result.value).subscribe((response) => {
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
              title: 'Password Updated successfully',
              showConfirmButton: false,
              timer: 1500,
            });

            const currentUrl = this.router.url;
            this.router
              .navigateByUrl('/', { skipLocationChange: true })
              .then(() => {
                this.router.navigateByUrl(currentUrl);
              });
          }
        });
      }
    });





  }
  navEditProfile(){
    this.router.navigate(['update-profile']);
  }
}
