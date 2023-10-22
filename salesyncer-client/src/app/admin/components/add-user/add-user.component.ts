import { Component } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { SharedApiService } from 'src/app/shared/services/shared-api.service';
import { AdminAPIService } from '../../services/admin-api.service';
@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss'],
})
export class AddUserComponent {
  constructor(
    private sharedAPI: SharedApiService,
    private fb: FormBuilder,
    private router: Router,
    private adminAPI: AdminAPIService,
  ) {}

  submitted: boolean = false;

  signupGroup!: FormGroup;
  branchData!: any;

  getBranchData() {
    this.sharedAPI.getBranches().subscribe((response: any) => {
      if (response.status == 'OK') {
        this.branchData = response.branchData;
        console.log(this.branchData);
      } else {
        console.log(response.message);
      }
    });
  }

  ngOnInit() {
    this.getBranchData();

    this.signupGroup = this.fb.group({
      name: [
        '',
        [Validators.required, Validators.pattern('^[A-Za-z \\.]+')],
      ],
      selectedBranch: ['',[
        Validators.required,       
      ],],

      email: [
        '',
        [
          Validators.required,
          Validators.pattern('^[^ ][a-z.\\-_0-9]+@[a-z0-9]+\\.[a-z]{2,10}'),
        ],
      ],
      mobile: ['', [Validators.required, Validators.pattern('^\\d{10}$')]],
      addressLine1: ['', [Validators.required]],
      addressLine2: ['', [Validators.required]],
      place: ['', [Validators.required]],
      pincode: ['', [Validators.required, Validators.pattern('^[0-9]{6}$')]],
      role: ['', [Validators.required, Validators.pattern('^[A-Za-z \\.]+')]],
      designation: [
        '',
        [Validators.required, Validators.pattern('^[A-Za-z \\.]+')],
      ],
    });
  }

  signupSubmit(data: any): void {
    this.submitted = true;
    if (!data.invalid) {
      // console.log(data.value);
      console.log('Data', data);
      const {
        name,
        selectedBranch,
        email,
        mobile,
        addressLine1,
        addressLine2,
        place,
        pincode,
        role,
        designation,
      } = data.value;
      const body = {
        name,
        selectedBranch,
        email,
        mobile,
        addressLine1,
        addressLine2,
        place,
        pincode,
        role,
        designation,
      };

      console.log('body-' + body.selectedBranch);
        this.adminAPI.addEmployee(body).subscribe((response) => {
          // console.log(response);
          if (response && response.status !== 'OK') {
            Swal.fire('Error', response.message, 'error');
          } else {
            Swal.fire({
              position: 'center',
              icon: 'success',
              title: 'User registered successfully',
              showConfirmButton: false,
              timer: 1500,
            });

            const currentUrl = this.router.url;
            this.router.navigate(['admin/employees'])
           
           
          }
        });
      } else {
        Swal.fire('Error', 'Please fill the fields without errors', 'error');
      }
    }
  }

