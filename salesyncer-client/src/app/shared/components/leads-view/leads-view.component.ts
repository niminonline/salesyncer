import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Router, ActivatedRoute } from '@angular/router';
import { selectContactsData } from 'src/app/employee/store/selectors/contacts.selectors ';
import { ContactType, ContactsType } from '../../interfaces/interfaces';
import { SharedApiService } from '../../services/shared-api.service';
@Component({
  selector: 'app-leads-view',
  templateUrl: './leads-view.component.html',
  styleUrls: ['./leads-view.component.scss'],
})
export class LeadsViewComponent implements OnInit {
  constructor(
    private store: Store,
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
    console.log("id=",this._id)
    this.sharedApi.getLead(this._id).subscribe((response) => {
      if (response) {
        this.leadData = response.LeadData;
        this.leadData.log = this.leadData.log.reverse();
        console.log('Response', this.leadData);
      } else {
        console.log('Employee fetching from state failed');
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
    console.log(currentroute);
  }

  navContacts() {
    const currentroute = this.router.url;
    if (currentroute.toString().includes('admin')) {
      this.router.navigate(['admin/leads']);
    } else {
      this.router.navigate(['leads']);
    }
    console.log(currentroute);
  }
}
