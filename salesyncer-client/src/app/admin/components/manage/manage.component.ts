import { Component,OnInit} from '@angular/core';
import { Store } from '@ngrx/store';
import * as activityTypesDataActions from '../../../shared/store/actions/activityTypesData.actions';

@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.scss']
})
export class ManageComponent implements OnInit{
  
constructor(private store: Store ){}

ngOnInit(){
  this.setActivityTypesData();
}

  setActivityTypesData(){

    this.store.dispatch(activityTypesDataActions.retrieveActivityTypesData());
}

}

