import { AfterViewInit, Component, Input, OnInit } from '@angular/core';

import { Store } from '@ngrx/store';
import * as leadsDataActions from '../../../../shared/store/actions/leadsData.actions';
import { selectLeadsData } from '../../../../shared/store/selectors/leadsData.selectors';
import { Lead } from 'src/app/shared/interfaces/interfaces';
import { Router } from '@angular/router';
import Chart from 'chart.js/auto';

@Component({
  selector: 'app-leads-widget',
  templateUrl: './leads-widget.component.html',
  styleUrls: ['./leads-widget.component.scss'],
})
export class LeadsWidgetComponent implements OnInit,AfterViewInit {
  @Input() role!: string;
  @Input() user!: string;
  leadsData!: Lead[];
  hotCount!: number;
  warmCount!: number;
  coldCount!: number;
  newCount!: number;
  inProgressCount!: number;
  negotiationCount!: number;
  convertedCount!: number;
  failedCount!: number;
  trendingProducts:any={};
  trendingCategories:any={}
  popularSources:any={};
  chart: any;

  constructor(private store: Store, private router: Router) {}
  ngOnInit() {
    this.getLeadsData();
 
  }

  ngAfterViewInit() {
    // this.createChart();
  }

  getLeadsData() {
    this.store.dispatch(leadsDataActions.retrieveLeadsData());
    this.store.select(selectLeadsData).subscribe((response) => {
      if (this.role !== 'admin') {
        this.leadsData = response.filter((lead) => lead.owner == this.user);
      } else {
        this.leadsData = response;
      }
      this.hotCount = this.leadsData.filter(
        (lead) => lead.type == 'Hot'
      ).length;
      this.warmCount = this.leadsData.filter(
        (lead) => lead.type == 'Warm'
      ).length;
      this.coldCount = this.leadsData.filter(
        (lead) => lead.type == 'Cold'
      ).length;
      this.newCount = this.leadsData.filter(
        (lead) => lead.status == 'New'
      ).length;
      this.inProgressCount = this.leadsData.filter(
        (lead) => lead.status == 'In Progress'
      ).length;
      this.negotiationCount = this.leadsData.filter(
        (lead) => lead.status == 'Negotiation'
      ).length;
      this.convertedCount = this.leadsData.filter(
        (lead) => lead.status == 'Converted'
      ).length;
      this.failedCount = this.leadsData.filter(
        (lead) => lead.status == 'Failed'
      ).length;


      this.getTrendingProducts();
      this.getTrendingCategories();
      this.getPopularSources();

      this.trendingProductsChart()
      this.trendingCategoriesChart()
      this.popularSourcesChart()
    });
    
  }
  
  getTrendingProducts() {
    this.leadsData.map((lead)=>{
      if(lead.product){
        this.trendingProducts[lead.product]=  (this.trendingProducts[lead.product]||0)+1
      }
    })
  }
  getTrendingCategories() {
    this.leadsData.map((lead)=>{
      if(lead.product){
        this.trendingCategories[lead.productCategory]=  (this.trendingCategories[lead.productCategory]||0)+1
      }
    })
  }
  getPopularSources() {
    
    this.leadsData.map((lead)=>{
      if(lead.product){
        this.popularSources[lead.source]=  (this.popularSources[lead.source]||0)+1
      }
    })
  }




  trendingCategoriesChart(){
  
    this.chart =  new Chart("trendingCategoriesChart", {
      type: 'polarArea',

      data: {
        labels: Object.keys(this.trendingCategories),
        datasets: [
          {
            label: 'Trending Categories',
            data: Object.values(this.trendingCategories),
          },
        ],
      },
      options: {
        aspectRatio:2.5
      }
      
    });
  }

  trendingProductsChart(){
  
    this.chart =  new Chart("trendingProductsChart", {
      type: 'doughnut',

      data: {
        labels: Object.keys(this.trendingProducts),
        datasets: [
          {
            label: 'Trending Products',
            data: Object.values(this.trendingProducts),
          },
        ],
      },
      options: {
        aspectRatio:2.5
      }
      
    });
  }

  popularSourcesChart(){
  
    this.chart =  new Chart("popularSourcesChart", {
      type: 'pie',

      data: {
        labels: Object.keys(this.popularSources),
        datasets: [
          {
            label: 'Popular Sources',
            data: Object.values(this.popularSources),
          },
        ],
      },
      options: {
        aspectRatio:2.5
      }
      
    });
  }


  
  navigateLeads() {
    const currentroute = this.router.url;
    if (currentroute.toString().includes('admin')) {
      this.router.navigate(['admin/leads']);
    } else {
      this.router.navigate(['leads']);
    }
  }
}
