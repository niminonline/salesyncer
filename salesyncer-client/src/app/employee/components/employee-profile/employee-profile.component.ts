import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import { selectEmployeeData } from '../../store/selectors/user.selectors';

@Component({
  selector: 'app-employee-profile',
  templateUrl: './employee-profile.component.html',
  styleUrls: ['./employee-profile.component.scss'],
})
export class EmployeeProfileComponent implements OnInit {
  constructor(private store: Store) {}
  employeeData!: any;

  ngOnInit(): void {
    this.getEmployeeData();
  }

  getEmployeeData() {
    this.store.select(selectEmployeeData).subscribe((employeeData) => {
      if (employeeData) {
        this.employeeData = employeeData;
      } else {
        console.log('Employee fetching from state failed');
      }
    });
  }
}
