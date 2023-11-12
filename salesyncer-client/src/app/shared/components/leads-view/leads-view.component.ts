import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { SharedApiService } from '../../services/shared-api.service';
@Component({
  selector: 'app-leads-view',
  templateUrl: './leads-view.component.html',
  styleUrls: ['./leads-view.component.scss'],
})
export class LeadsViewComponent implements OnInit {
  constructor(
    private router: Router,
    private activatedRouter: ActivatedRoute,
    private sharedApi:SharedApiService,
  ) {}
  leadData!: any;
  selectedLeadData!: any;
  _id!:string|null;

  ngOnInit(): void {
    this.getleadData();
  }

  getleadData() {
    this._id = this.activatedRouter.snapshot.queryParamMap.get('_id');
    this.sharedApi.getLead(this._id).subscribe((response) => {
      if (response) {
        this.leadData = response.LeadData;
        this.leadData.log = this.leadData.log.reverse();
      } else {
        console.error('Employee fetching from state failed');
      }
    });
  }

  navEditContact() {
    const currentroute = this.router.url;
    if (currentroute.toString().includes('admin')) {
      this.router.navigate(['admin/leads-edit'], {
        queryParams: { _id: this.leadData._id },
      });
    } else {
      this.router.navigate(['leads-edit'], {
        queryParams: { _id: this.leadData._id },
      });
    }
  }

  navContacts() {
    const currentroute = this.router.url;
    if (currentroute.toString().includes('admin')) {
      this.router.navigate(['admin/leads']);
    } else {
      this.router.navigate(['leads']);
    }
  }
}
