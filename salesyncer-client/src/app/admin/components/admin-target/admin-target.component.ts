import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { SharedApiService } from 'src/app/shared/services/shared-api.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AdminAPIService } from '../../services/admin-api.service';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-admin-target',
  templateUrl: './admin-target.component.html',
  styleUrls: ['./admin-target.component.scss'],
})
export class AdminTargetComponent implements OnInit, AfterViewInit {
  targetData: any = [];
  employeesData!: any;
  dataSource!: MatTableDataSource<any>;
  empSelectForm: any;
  selectedEmployeeData: any;
  setTargetForm!: any;
  submitted: boolean = false;
  showSpinner: boolean = false;
  currentYear:number=  parseInt(new Date().getFullYear().toString());
  displayedColumns: string[] = [
    'month',
    'year',
    'target',
    'achieved',
    'remaining',
    'notes',
  ];

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
  years = [this.currentYear-1, this.currentYear,this.currentYear+1];

  constructor(
    private sharedApi: SharedApiService,
    private formBuilder: FormBuilder,
    private router: Router,
    private adminApi: AdminAPIService
  ) {
    this.initEmpForm();
    this.initSetTargetForm();
  }

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  ngOnInit() {
    this.getEmployeesData();
  }

  initEmpForm() {
    this.empSelectForm = this.formBuilder.group({
      _id: ['', [Validators.required]],
      month: ['', [Validators.required]],
      year: ['', [Validators.required]],
    });

    const employeeSelect: FormControl = this.empSelectForm.get(
      '_id'
    ) as FormControl;
    employeeSelect.valueChanges.subscribe((selectedEmployee_id) => {
      if (selectedEmployee_id) {
        this.onEmployeeChange(selectedEmployee_id);
      }
    });
  }

  initSetTargetForm() {
    this.setTargetForm = this.formBuilder.group({
      _id: ['', [Validators.required]],
      month: ['', [Validators.required]],
      year: ['', [Validators.required]],
      target: ['', [Validators.pattern(/^\d+(\.\d+)?$/)]],
      notes: [''],
    });
  }

  getEmployeesData() {
    this.sharedApi.getEmployeesData().subscribe((response) => {
      if (response) {
        this.employeesData = response.employeesData;
        console.log('Emp data', this.employeesData);
        // this.targetData = employeesData.target;
      }
    });
    this.initEmpForm();
    this.initSetTargetForm();
  }
  // getTargetsData(_id: string) {}

  onEmployeeChange(selectedEmp_id: string) {
    this.selectedEmployeeData = this.employeesData.find(
      (employee: any) => employee._id == selectedEmp_id
    );
    console.log('emp data', this.selectedEmployeeData);
    this.targetData = this.selectedEmployeeData.target;
    console.log('TARGET', this.targetData);
    this.dataSource = new MatTableDataSource(this.targetData);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  onEmpSelectSubmit() {}

  onSetTargetSubmit(data: any): void {
    this.submitted = true;
    if (!data.invalid) {
      this.showSpinner = true;

      console.log(data.value);

      this.adminApi.setTargetByEmpId(data.value).subscribe((response) => {
        // console.log(response);

        if (response && response.status !== 'OK') {
          this.showSpinner = false;
          Swal.fire('Error', response.message, 'error');
        } else {
          this.showSpinner = false;
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Target set successfully',
            showConfirmButton: false,
            timer: 1500,
          });

          const currentUrl = this.router.url;
          this.router
            .navigateByUrl('admin', { skipLocationChange: true })
            .then(() => {
              this.router.navigateByUrl(currentUrl);
            });
        }
      });
    } else {
      Swal.fire('Error', 'Please fill the fields without errors', 'error');
    }
  }
}
