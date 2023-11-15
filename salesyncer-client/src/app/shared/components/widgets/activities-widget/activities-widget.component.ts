import { Component, Input, OnInit } from '@angular/core';
import * as activitiesDataActions from '../../../../shared/store/actions/activitiesData.actions';
import { selectActivitiesData } from 'src/app/shared/store/selectors/activitiesData.selectors';

import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { Activity } from 'src/app/shared/interfaces/interfaces';

@Component({
  selector: 'app-activities-widget',
  templateUrl: './activities-widget.component.html',
  styleUrls: ['./activities-widget.component.scss'],
})
export class ActivitiesWidgetComponent implements OnInit {
  @Input() role!: string;
  @Input() user!: string;
  activitiesData!: Activity[];
  upcomingActivitiesCount: any;
  todaysActivities!: Activity[];
  missedActivities!: Activity[];
  todaysActivitiesCount!: number;
  missedActivitiesCount!: number;

  constructor(private store: Store, private router: Router) {}
  ngOnInit() {
    this.setActivitiesData();
    this.getActivitiesData();
  }

  setActivitiesData() {
    this.store.dispatch(activitiesDataActions.retrieveActivitiesData());
  }
  getActivitiesData() {
    this.store.select(selectActivitiesData).subscribe((response) => {
      if (this.role !== 'admin') {
        this.activitiesData = response.filter(
          (activity) => activity.owner == this.user
        );
      } else {
        this.activitiesData = response;
      }

      const today = new Date().setHours(0, 0, 0, 0);

      this.todaysActivities = this.activitiesData.filter((activity: any) => {
        const currentScheduledTime = new Date(activity.scheduledTime).setHours(
          0,
          0,
          0,
          0
        );
        return currentScheduledTime == today && activity.status !== 'Completed';
      });
      this.todaysActivitiesCount = this.todaysActivities.length;

      this.missedActivities = this.activitiesData.filter((activity: any) => {
        const currentScheduledTime = new Date(activity.scheduledTime).setHours(
          0,
          0,
          0,
          0
        );
        return currentScheduledTime < today && activity.status !== 'Completed';
      });
      this.missedActivitiesCount = this.missedActivities.length;
    });
  }
  navigateActivities() {
    const currentroute= this.router.url;
    if(currentroute.toString().includes('admin'))
    {
     this.router.navigate(['admin/activities']);
    }
    else{
      this.router.navigate(['activities']);
    }

  }
}
