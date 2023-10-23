import { Component,Input,Output ,EventEmitter} from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatCardModule} from '@angular/material/card';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {


  @Input() userName!:string;
  @Output() logout: EventEmitter<void> = new EventEmitter<void>();
  constructor(){
   
  }


  emitLogoutEvent() {
    this.logout.emit();

}
}
