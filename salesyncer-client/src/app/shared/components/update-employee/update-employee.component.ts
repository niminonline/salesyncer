import { Component } from '@angular/core';
import {  FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { HttpHeaders } from '@angular/common/http';
import { MatDialogRef } from '@angular/material/dialog';
import { select } from '@ngrx/store';
import { selectEmployeeId } from 'src/app/employee/store/selectors/auth.selectors';
import { Store } from '@ngrx/store';
import { SharedApiService } from '../../services/shared-api.service';


@Component({
  selector: 'app-update-employee',
  templateUrl: './update-employee.component.html',
  styleUrls: ['./update-employee.component.scss']
})
export class UpdateEmployeeComponent {

  constructor(
    private fb: FormBuilder,
    // public dialogRef: MatDialogRef<UpdateEmployeeComponent>,
    private store: Store,
    private sharedApi:SharedApiService
  ) {}


  _id!: string | null;
  token!: string | null;
  updateEmployeeGroup!: FormGroup;
  username!: string | undefined;
  email!: string | undefined;
  mobile!: string | undefined;
  submitted: boolean = false;


  ngOnInit() {
    this.getemployeeData();
  }

  getemployeeData() {

     this.store.pipe(select(selectEmployeeId)).subscribe((userId) => {
      if(userId)
      this.email= userId;
     console.log("user id",this.email)
    });


   

  this.updateEmployeeGroup = this.fb.group({
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

  updateUser(group: FormGroup) {
    this.submitted=true;
    if(group.valid){
      const data= this.updateEmployeeGroup.value;
      console.log("Data",data);

      this.store.select(selectEmployeeId).subscribe((_id) => {
        this._id = _id;
      });
     
        this.sharedApi.updateEmployee(data).subscribe((response)=>{
          

          if(response.status=='OK'){
           
            Swal.fire({
              position: 'center',
              icon: 'success',
              title: 'User updated successfully',
              showConfirmButton: false,
              timer: 1500,
            });
            // console.log("RESPonse from update profile=",response)
          }
          else{
            Swal.fire(response.status, response.message, 'error');
          }
        })
      


      // this.dialogRef.close();
    }
    else{
      console.error("invalid")
    }
  }

  // closeDialog(event: Event) {
  //   event.preventDefault();
  //   this.dialogRef.close();
  // }


}
