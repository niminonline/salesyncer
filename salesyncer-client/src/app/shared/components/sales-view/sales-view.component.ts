import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { SharedApiService } from '../../services/shared-api.service';

@Component({
  selector: 'app-sales-view',
  templateUrl: './sales-view.component.html',
  styleUrls: ['./sales-view.component.scss'],
})
export class SalesViewComponent implements OnInit {
  constructor(
    private router: Router,
    private activatedRouter: ActivatedRoute,
    private sharedApi: SharedApiService
  ) {}
  saleData!: any;
  _id!: string | null;

  ngOnInit(): void {
    this.getSaleData();
  }

  getSaleData() {
    this._id = this.activatedRouter.snapshot.queryParamMap.get('_id');
    console.log('id=', this._id);
    this.sharedApi.getSale(this._id).subscribe((response) => {
      if (response) {
        this.saleData = response.saleData;
        console.log('Response', this.saleData);
      } else {
        console.log('Sale data fetching failed');
      }
    });
  }

  navEditSale() {
    const currentroute = this.router.url;
    if (currentroute.toString().includes('admin')) {
      this.router.navigate(['admin/sales-edit'], {
        queryParams: { _id: this.saleData._id },
      });
    } else {
      this.router.navigate(['sales-edit'], {
        queryParams: { _id: this.saleData._id },
      });
    }
    console.log(currentroute);
  }

  navSales() {
    const currentroute = this.router.url;
    if (currentroute.toString().includes('admin')) {
      this.router.navigate(['admin/sales']);
    } else {
      this.router.navigate(['sales']);
    }
    console.log(currentroute);
  }
}
