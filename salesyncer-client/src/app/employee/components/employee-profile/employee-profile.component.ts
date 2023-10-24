import { Component,OnInit } from '@angular/core';
import { SharedApiService } from 'src/app/shared/services/shared-api.service';
@Component({
  selector: 'app-employee-profile',
  templateUrl: './employee-profile.component.html',
  styleUrls: ['./employee-profile.component.scss']
})
export class EmployeeProfileComponent implements OnInit {


constructor(private sharedApi:SharedApiService){}
employeeData!:any;

  ngOnInit(): void {

    const _id= localStorage.getItem('_id');
    this.sharedApi.getEmployeeData(_id).subscribe((response)=>{
      console.log(response);
      this.employeeData= response.employeeData;

    })
    



  }
}
