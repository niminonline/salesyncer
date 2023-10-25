import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { SharedApiService } from 'src/app/shared/services/shared-api.service';
import { AdminDataRepoService } from '../../services/admin-data-repo.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-update-employee',
  templateUrl: './update-employee.component.html',
  styleUrls: ['./update-employee.component.scss'],
})
export class UpdateEmployeeComponent {
  constructor(
    private fb: FormBuilder,
    private sharedApi: SharedApiService,
    private adminDataRepo: AdminDataRepoService,
    private router: Router
  ) {}

  branchData: any;
  _id!: string | null;
  token!: string | null;
  updateEmployeeGroup!: FormGroup;
  name!: string | undefined;
  branch!: string | undefined;
  email!: string | undefined;
  phone!: string | undefined;
  addressLine1!: string | undefined;
  addressLine2!: string | undefined;
  place!: string | undefined;
  pincode!: string | undefined;
  role!: string | undefined;
  designation!: string | undefined;
  showSpinner: boolean = false;

  submitted: boolean = false;
  selectedEmpData!: any;

  ngOnInit() {
    this.getBranchData();
    this.getemployeeData();
  }

  getBranchData() {
    this.sharedApi.getBranches().subscribe((response: any) => {
      if (response.status == 'OK') {
        this.branchData = response.branchData;
        console.log(this.branchData);
      } else {
        console.log(response.message);
      }
    });
  }

  getemployeeData() {

    this.selectedEmpData = this.adminDataRepo.getSelectedEmpData();
    console.log('Selected user from service', this.selectedEmpData);
    this._id = this.selectedEmpData._id;
    this.name = this.selectedEmpData.name;
    this.branch = this.selectedEmpData.branch;
    this.email = this.selectedEmpData.email;
    this.phone = this.selectedEmpData.phone;
    this.addressLine1 = this.selectedEmpData.address.addressLine1;
    this.addressLine2 = this.selectedEmpData.address.addressLine2;
    this.place = this.selectedEmpData.address.place;
    this.pincode = this.selectedEmpData.address.pincode;
    this.role = this.selectedEmpData.role;
    this.designation = this.selectedEmpData.designation;

    this.updateEmployeeGroup = this.fb.group({
      name: [
        this.name,
        [Validators.required, Validators.pattern('^[A-Za-z \\.]+')],
      ],
      branch: [
        this.branch,
        [Validators.required],
      ],

      email: [
        this.email,
        [
          Validators.required,
          Validators.pattern('^[^ ][a-z.\\-_0-9]+@[a-z0-9]+\\.[a-z]{2,10}'),
        ],
      ],
      phone: [
        this.phone,
        [Validators.required, Validators.pattern('^\\d{10}$')],
      ],
      addressLine1: [this.addressLine1, [Validators.required]],
      addressLine2: [this.addressLine2, [Validators.required]],
      place: [this.place, [Validators.required]],
      pincode: [
        this.pincode,
        [Validators.required, Validators.pattern('^[0-9]{6}$')],
      ],
      role: [this.role, [Validators.required]],
      designation: [this.designation, [Validators.required]],
    });
  }

  updateEmployee(group: FormGroup) {
    this.submitted = true;
    if (group.valid) {
      const data = this.updateEmployeeGroup.value;
      console.log('Data', data);
      data._id = this._id;

      this.showSpinner = true;
      this.sharedApi.updateEmployee(data).subscribe((response) => {
        if (response.status == 'OK') {
          this.showSpinner = false;
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'User updated successfully',
            showConfirmButton: false,
            timer: 1500,
          });
          this.router.navigate(['admin/employees']);
        } else {
          this.showSpinner = false;
          Swal.fire(response.status, response.message, 'error');
        }
      });

    } else {
      console.error('invalid');
    }
  }
  navEmployees(){
    this.router.navigate(['admin/employees']);
  }

}
