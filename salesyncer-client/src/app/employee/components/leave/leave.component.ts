import { Component,OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { selectEmployeeId } from '../../store/selectors/auth.selectors';
import { Store } from '@ngrx/store';
import { EmployeeApiService } from '../../services/employee-api.service';


@Component({
  selector: 'app-leave',
  templateUrl: './leave.component.html',
  styleUrls: ['./leave.component.scss']
})
export class LeaveComponent implements OnInit  {
  _id!:string|null;
  leaveForm!: FormGroup;

displayedColumns: any;
tableData!: any;

constructor(private router:Router,
  private formBuilder: FormBuilder,
    private empApi: EmployeeApiService,
    private store:Store
   ){}

  

getEmpObject_id(){

  this.store.select(selectEmployeeId).subscribe((response)=>{
    this._id= response;
    // console.log("id==",this._id)
  })
  
}



  navAppyLeave(){
this.router.navigate(['apply-leave'])
  }
  
}
