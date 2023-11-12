import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import * as EmployeeActions from '.././../store/actions/user.actions'

import { selectEmployeeData } from '../../store/selectors/user.selectors';

@Component({
  selector: 'app-employee-profile',
  templateUrl: './employee-profile.component.html',
  styleUrls: ['./employee-profile.component.scss'],
})
export class EmployeeProfileComponent implements OnInit {
  constructor(private store: Store,private router:Router) {}
  employeeData!: any;

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
      } else {
        console.error('Employee fetching from state failed');
      }
    });
  }


  navEditProfile(){
    this.router.navigate(['update-profile']);
  }
}
