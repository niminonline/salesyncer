import { Component, OnInit, AfterViewInit, ViewChild, Input } from '@angular/core';
import { SharedApiService } from 'src/app/shared/services/shared-api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-leave-request-widget',
  templateUrl: './leave-request-widget.component.html',
  styleUrls: ['./leave-request-widget.component.scss']
})
export class LeaveRequestWidgetComponent implements OnInit {
  @Input() role!: string;
  @Input() user!: string;
  leaveRequestData!: any[];
  cancelRequestData!: any[];
  leaveRequestCount!: number;
  cancelRequestCount!: number;
  leavesData!: any;
  constructor(
    private sharedAPI: SharedApiService,
    private router: Router,
  ) {}

  ngOnInit() {
    this.getLeaveRequests();
  }

  getLeaveRequests() {
    this.sharedAPI.leaveRequests().subscribe((response) => {
      this.leavesData = response.leaveRequests;
      this.leavesData.map((leaveData: any) => {
        if (leaveData?.status == 'Pending') {
          leaveData.requestType = 'Leave Request';
        } else if (leaveData?.status == 'Cancellation Requested') {
          leaveData.requestType = 'Cancellation Request';
        }
      });
      this.leaveRequestData = this.leavesData.filter(
        (leaveData: any) => leaveData.status == 'Pending'
      );
      this.leaveRequestCount = this.leaveRequestData.length;
      this.cancelRequestData = this.leavesData.filter(
        (leaveData: any) => leaveData.status == 'Cancellation Requested'
      );
      this.cancelRequestCount = this.cancelRequestData.length;
    });
  }

  navToLeaveRequests(){
    this.router.navigate(['admin/leave-request'])
  }
}
