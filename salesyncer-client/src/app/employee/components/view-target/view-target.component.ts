import { selectEmployeeData } from '../../store/selectors/user.selectors';
import * as UserActions from '../../store/actions/user.actions';
import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { SharedApiService } from 'src/app/shared/services/shared-api.service';
import { Router } from '@angular/router';

import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

import { Store } from '@ngrx/store';
import { selectContactsData } from 'src/app/employee/store/selectors/contacts.selectors ';
import * as ContactsActions from 'src/app/employee/store/actions/contacts.actions ';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-target',
  templateUrl: './view-target.component.html',
  styleUrls: ['./view-target.component.scss'],
})
export class ViewTargetComponent implements OnInit, AfterViewInit {
  targetData!: any;
  dataSource!: MatTableDataSource<any>;
  displayedColumns: string[] = [
    'month',
    'year',
    'target',
    'achieved',
    'remaining',
    'notes',
  ];

  constructor(private store: Store) {}

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
    this.getTargetData();
  }

  getTargetData() {
    this.store.select(selectEmployeeData).subscribe((employeeData) => {
      if (employeeData) {
        this.targetData = employeeData.target;
        this.dataSource = new MatTableDataSource(this.targetData);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }
    });
  }
}
