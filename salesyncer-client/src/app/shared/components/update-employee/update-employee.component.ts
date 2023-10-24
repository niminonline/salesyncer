import { Component } from '@angular/core';
import {  FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { HttpHeaders } from '@angular/common/http';
import { MatDialogRef } from '@angular/material/dialog';
import { select } from '@ngrx/store';
import { selectUserId } from 'src/app/employee/store/selectors/auth.selectors';
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
    public dialogRef: MatDialogRef<UpdateEmployeeComponent>,
    private store: Store,
    private sharedApi:SharedApiService
  ) {}


  id!: string | null;
  token!: string | null;
  updateEmployeeGroup!: FormGroup;
  username!: string | undefined;
  email!: string | undefined;
  mobile!: string | undefined;
  submitted: boolean = false;


  ngOnInit() {
    this.getUserData();
  }

  getUserData() {

     this.store.pipe(select(selectUserId)).subscribe((userId) => {
      if(userId)
      this.email= userId;
     console.log("user id",this.email)
    });


   

    this.updateEmployeeGroup = this.fb.group({
      username: [
        this.username,
        [Validators.required, Validators.pattern('^[A-Za-z \\.]+')],
      ],
    
          mobile: [
        this.mobile,
        [Validators.required, Validators.pattern('^\\d{10}$')],
      ],
    });
  }

  updateUser(group: FormGroup) {
    this.submitted=true;
    if(group.valid){
      const data= this.updateEmployeeGroup.value;
      console.log("Data",data);

      this.store.select(selectUserId).subscribe((_id) => {
        this.id = _id;
      });
     
        // this.sharedApi.updateEmployee(data).subscribe((response)=>{
          

          // if(response.status=='OK'){
           
          //   Swal.fire({
          //     position: 'center',
          //     icon: 'success',
          //     title: 'User updated successfully',
          //     showConfirmButton: false,
          //     timer: 1500,
          //   });
          //   // console.log("RESPonse from update profile=",response)
          // }
          // else{
          //   Swal.fire(response.status, response.message, 'error');
          // }
        // })
      


      this.dialogRef.close();
    }
    else{
      console.error("invalid")
    }
  }

  closeDialog(event: Event) {
    event.preventDefault();
    this.dialogRef.close();
  }


}
