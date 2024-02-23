import { Component, Input, } from '@angular/core';


@Component({
  selector: 'app-target-card',
  templateUrl: './target-card.component.html',
  styleUrls: ['./target-card.component.scss']
})
export class TargetCardComponent {


  @Input() target!:string;
  @Input() achieved!:string;
  @Input() remaining!:string;
  @Input() percetangeCompleted!:number;

}
