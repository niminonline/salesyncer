import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Employee } from 'src/app/shared/interfaces/interfaces';
import * as employeesDataActions from '../../../../shared/store/actions/employeesData.actions';
import { selectEmployeesData } from 'src/app/shared/store/selectors/employeesData.selectors';
import { Store } from '@ngrx/store';
import Swal from 'sweetalert2';
import { selectEmployeeData } from '../../../../shared/store/selectors/user.selectors';
import * as UserActions from '../../../../shared/store/actions/user.actions';

@Component({
  selector: 'app-target-widget',
  templateUrl: './target-widget.component.html',
  styleUrls: ['./target-widget.component.scss'],
})
export class TargetWidgetComponent implements OnInit {
  @Input() role!: string;
  @Input() user!: string;
  empSelectForm: any;
  currentYear: number = parseInt(new Date().getFullYear().toString());
  targetData: any = [];
  target!: string;
  achieved!: string;
  remaining!: string;
  selectedEmployeeData: any;
  setTargetForm!: FormGroup;
  submitted: boolean = false;
  showSpinner: boolean = false;
  searchedTarget: any = {};
  percetangeCompleted!: number;
  employeesData!: Employee[];
  isTargetCardVisible = false;
  casualLeaveBalance!:number;
  sickLeaveBalance!:number;
  months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];
  today = Date.now();
  years = [this.currentYear - 1, this.currentYear, this.currentYear + 1];
  _id!: string;

  constructor(private formBuilder: FormBuilder, private store: Store) {}

  ngOnInit() {
    if (this.role !== 'admin') {
      this.store.dispatch(UserActions.retrieveEmployeeData());

      this.store.select(selectEmployeeData).subscribe((employeeData) => {
        if (employeeData) {
          this._id = employeeData._id;
          this.casualLeaveBalance=employeeData.casualLeaveBalance;
          this.sickLeaveBalance=employeeData.sickLeaveBalance;
        }
      });
    }
    this.getEmployeesData();
  }

  getEmployeesData() {
    this.store.dispatch(employeesDataActions.retrieveEmployeesData());
    this.store.select(selectEmployeesData).subscribe((response) => {
      this.employeesData = response;
      this.initEmpForm();
    });
  }

  initEmpForm() {
    this.empSelectForm = this.formBuilder.group({
      _id: ['6535bdb8f6cbeae6217c6b88'],
      month: ['November', [Validators.required]],
      year: ['2023', [Validators.required]],
    });
  }

  onEmpSelectSubmit(data: any) {
    if (!data.invalid) {
      const { month, year } = data.value;
      let _id = data.value._id;
      if (this.role !== 'admin') {
        _id = this._id;
      }

      this.selectedEmployeeData = this.employeesData.find((employee) => {
        return employee._id == _id;
      });

      this.targetData = this.selectedEmployeeData.target;
      this.searchedTarget = this.targetData?.find((targetArray: any) => {
        return targetArray.month == month && targetArray.year == year;
      });

      if (this.searchedTarget) {
        this.isTargetCardVisible = true;
        this.target = this.searchedTarget.target;
        this.achieved = this.searchedTarget.achieved;
        this.remaining = this.searchedTarget.remaining;
        this.percetangeCompleted = Math.round(
          (parseFloat(this.achieved) / parseFloat(this.target)) * 100
        );
      } else {
        Swal.fire('Error', 'No results found', 'error');
      }
    }
  }
}
