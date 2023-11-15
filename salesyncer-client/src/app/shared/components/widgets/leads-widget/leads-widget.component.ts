import { Component,Input } from '@angular/core';

import { Store } from '@ngrx/store';
import * as leadsDataActions from '../../../../shared/store/actions/leadsData.actions';
import { selectLeadsData } from '../../../../shared/store/selectors/leadsData.selectors';
import { Lead } from 'src/app/shared/interfaces/interfaces';

@Component({
  selector: 'app-leads-widget',
  templateUrl: './leads-widget.component.html',
  styleUrls: ['./leads-widget.component.scss']
})
export class LeadsWidgetComponent {

  @Input() role!:string;
  leadsData!: Lead[];
  hotCount!:number;
  warmCount!:number;
  coldCount!:number;

  constructor(private store: Store){}
  ngOnInit() {
    this.getLeadsData();
 
  }




  getLeadsData() {
    this.store.dispatch(leadsDataActions.retrieveLeadsData());
    this.store.select(selectLeadsData).subscribe((response) => {
      if(this.role!=='admin'){

      }
      this.leadsData = response;
      this.hotCount= this.leadsData.filter((lead)=> lead.type=='Hot').length;
      this.warmCount= this.leadsData.filter((lead)=> lead.type=='Warm').length;
      this.coldCount= this.leadsData.filter((lead)=> lead.type=='Cold').length;
    });
  }

}
