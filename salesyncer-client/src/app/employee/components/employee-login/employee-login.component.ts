import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { EmployeeApiService } from '../../services/employee-api.service';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-employee-login',
  templateUrl: './employee-login.component.html',
  styleUrls: ['./employee-login.component.scss']
})
export class EmployeeLoginComponent {
  title: string = 'Employee Login';
  constructor(private route: Router, private empApi:EmployeeApiService) {}

  handleCredentials(credentials: any) {
    this.empApi.login(credentials).subscribe((response) => {
      if (response.status !== 'OK' && response.message) {
        Swal.fire('Error', response.message, 'error');
      } else {
        if (response.token && response._id) {
          localStorage.setItem('token', response.token);
          localStorage.setItem('_id', response._id);
        }
        const Toast = Swal.mixin({
          toast: true,
          position: 'bottom',
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer);
            toast.addEventListener('mouseleave', Swal.resumeTimer);
          },
        });

        Toast.fire({
          icon: 'success',
          title: 'Signed in successfully',
        });

        this.route.navigate(['/']);
      }
    });
  }




}
