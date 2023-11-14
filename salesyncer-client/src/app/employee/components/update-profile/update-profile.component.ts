import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { select } from '@ngrx/store';
import { selectEmployeeId } from 'src/app/shared/store/selectors/auth.selectors';
import { Store } from '@ngrx/store';
import { SharedApiService } from 'src/app/shared/services/shared-api.service';
import { Router } from '@angular/router';
import { selectEmployeeData } from '../../../shared/store/selectors/user.selectors';
import * as UserActions from '../../../shared/store/actions/user.actions';


@Component({
  selector: 'app-update-profile',
  templateUrl: './update-profile.component.html',
  styleUrls: ['./update-profile.component.scss'],
})
export class UpdateProfileComponent {
  constructor(
    private fb: FormBuilder,
    // public dialogRef: MatDialogRef<UpdateEmployeeComponent>,
    private store: Store,
    private sharedApi: SharedApiService,
    private router:Router
  ) {}

  _id!: string | null;
  token!: string | null;
  updateEmployeeGroup!: FormGroup;
  submitted:boolean=false;

  name!: string | undefined;
  phone!: string | undefined;
  addressLine1!: string | undefined;
  addressLine2!: string | undefined;
  place!: string | undefined;
  pincode!: Number | undefined;

  ngOnInit() {
    this.getemployeeData();
  }

  getemployeeData() {
          this.store.select(selectEmployeeData).subscribe((employeeData) => {
        if (employeeData) {
          this.name= employeeData.name;
          this.phone=employeeData.phone;
          this.addressLine1=employeeData.address.addressLine1;
          this.addressLine2=employeeData.address.addressLine2;
          this.place=employeeData.address.place;
          this.pincode=employeeData.address.pincode;
        } else {
          console.error('Employee fetching from state failed');
        }
      });
    

    this.updateEmployeeGroup = this.fb.group({
      name: [this.name, [Validators.required, Validators.pattern('^[A-Za-z \\.]+')]],
      mobile: [this.phone, [Validators.required, Validators.pattern('^\\d{10}$')]],
      addressLine1: [this.addressLine1, [Validators.required]],
      addressLine2: [this.addressLine2, [Validators.required]],
      place: [this.place, [Validators.required]],
      pincode: [this.pincode, [Validators.required, Validators.pattern('^[0-9]{6}$')]],
    });
  }

  updateEmployee(group: FormGroup) {
    this.submitted = true;
    if (group.valid) {
      const newEmpData = this.updateEmployeeGroup.value;

      this.store.select(selectEmployeeId).subscribe((_id) => {
        this._id = _id;
      });
      newEmpData._id=this._id;
      this.sharedApi.updateEmployee(newEmpData).subscribe((response) => {
        if (response.status == 'OK') {

          this.store.dispatch(UserActions.retrieveEmployeeData());

          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'User updated successfully',
            showConfirmButton: false,
            timer: 1500,
          });
          this.router.navigate(['profile'])
        } else {
          Swal.fire(response.status, response.message, 'error');
        }
      });

    } else {
      console.error('invalid');
    }
  }


  navProfile(){
    this.router.navigate(['/profile'])

  }
}
