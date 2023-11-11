import { Component, Input, } from '@angular/core';


@Component({
  selector: 'app-target-card',
  templateUrl: './target-card.component.html',
  styleUrls: ['./target-card.component.scss']
})
export class TargetCardComponent {


  @Input() target:any;
  @Input() achieved:any;
  @Input() remaining:any;
  @Input() percetangeCompleted:any;

}
