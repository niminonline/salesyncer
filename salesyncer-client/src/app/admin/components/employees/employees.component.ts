import { Component,OnInit,AfterViewInit, ViewChild } from '@angular/core';
import { SharedApiService } from 'src/app/shared/services/shared-api.service';
import { Router } from '@angular/router';
import { AdminDataRepoService } from '../../services/admin-data-repo.service';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { TooltipPosition } from '@angular/material/tooltip';
import { FormControl } from '@angular/forms';
import { Branch, BranchData, Employee, EmployeesData } from 'src/app/shared/interfaces/interfaces';





@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.scss']
})
export class EmployeesComponent implements OnInit  {
  branchData!: Branch[];
tableData!:any;
employeesData!:Employee[];
dataSource!: MatTableDataSource<any>;
selectedEmployeeData!:any;

displayedColumns: string[] = ['name', 'empId', 'branch','email','phone','role','designation','actions'];
positionOptions: TooltipPosition[] = ['below', 'above', 'left', 'right'];
position = new FormControl(this.positionOptions[0]);

@ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;



constructor(private sharedAPI:SharedApiService, private router:Router,private adminDataRepo:AdminDataRepoService){}


ngOnInit(){

  this.sharedAPI.getBranches().subscribe((response:BranchData)=>{
    if(response.status=='OK'){

      this.branchData=response.branchData;
    }
    else{
      console.error(response.message);
    }
  })

  this.sharedAPI.getEmployeesData().subscribe((response:EmployeesData)=>{
    if(response.status=='OK'){

      this.employeesData=response.employeesData;

      this.dataSource = new MatTableDataSource(this.employeesData);
      this.dataSource.paginator=this.paginator;
      this.dataSource.sort = this.sort;

     


    }
    else{
      console.error(response.message);
    }
  })


}



applyFilter(event: Event) {
  const filterValue = (event.target as HTMLInputElement).value;
  this.dataSource.filter = filterValue.trim().toLowerCase();

  if (this.dataSource.paginator) {
    this.dataSource.paginator.firstPage();
  }
}



addUser(){
this.router.navigate(['admin/add-user'])
}

navViewEmployee(_id:string){

  this.selectedEmployeeData= this.employeesData.find((employee:Employee)=>{
    return employee._id==_id; 
    
  })
  
  this.adminDataRepo.setSelectedEmpData(this.selectedEmployeeData);
  this.router.navigate(['admin/view-employee'])


}

navUpdateEmployee(_id:string){

  this.selectedEmployeeData= this.employeesData.find((employee:Employee)=>{
    return employee._id==_id; 
  })

  this.adminDataRepo.setSelectedEmpData({...this.selectedEmployeeData});

this.router.navigate(['admin/update-employee'])

}
 

}
