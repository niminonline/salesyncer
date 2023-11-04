import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { SharedApiService } from '../../services/shared-api.service';

@Component({
  selector: 'app-activities-view',
  templateUrl: './activities-view.component.html',
  styleUrls: ['./activities-view.component.scss'],
})
export class ActivitiesViewComponent implements OnInit {
  constructor(
    private router: Router,
    private activatedRouter: ActivatedRoute,
    private sharedApi: SharedApiService
  ) {}
  activityData!: any;
  _id!: string | null;

  ngOnInit(): void {
    this.getActivityData();
  }

  getActivityData() {
    this._id = this.activatedRouter.snapshot.queryParamMap.get('_id');
    console.log('id=', this._id);
    this.sharedApi.getActivity(this._id).subscribe((response) => {
      if (response) {
        this.activityData = response.activityData;

        console.log('Response', this.activityData);
      } else {
        console.log('Activity fetching failed');
      }
    });
  }

  navEditActivity() {
    const currentroute = this.router.url;
    if (currentroute.toString().includes('admin')) {
      this.router.navigate(['admin/activities-edit'], {
        queryParams: { _id: this.activityData._id },
      });
    } else {
      this.router.navigate(['activities-edit'], {
        queryParams: { _id: this.activityData._id },
      });
    }
    console.log(currentroute);
  }

  navActivities() {
    const currentroute = this.router.url;
    if (currentroute.toString().includes('admin')) {
      this.router.navigate(['admin/activities']);
    } else {
      this.router.navigate(['activities']);
    }
    console.log(currentroute);
  }
}
