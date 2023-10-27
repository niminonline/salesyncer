import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Router,ActivatedRoute } from '@angular/router';
import { selectContactsData } from 'src/app/employee/store/selectors/contacts.selectors ';
import { ContactType,ContactsType } from '../../interfaces/interfaces';

@Component({
  selector: 'app-contacts-view',
  templateUrl: './contacts-view.component.html',
  styleUrls: ['./contacts-view.component.scss']
})
export class ContactsViewComponent  implements OnInit {


  constructor(private store: Store,private router:Router,private activatedRouter:ActivatedRoute) {}
  contactsData!: any;
  selectedContactData!: ContactType;

  ngOnInit(): void {

    this.getContactsData();
    const _id= this.activatedRouter.snapshot.queryParamMap.get('_id');
    // console.log("selected contact",this.selectedContactData);
    this.selectedContactData=this.contactsData.find((contact:ContactType)=>contact._id==_id);
    // console.log("Selected contact",)


  }

  getContactsData() {
    this.store.select(selectContactsData).subscribe((response) => {
      if (response) {
        this.contactsData = response;
        console.log("Response",this.contactsData)
      } else {
        console.log('Employee fetching from state failed');
      }
    });
  }


  navContacts(){
    this.router.navigate(['contacts']);
  }
  navEditContact(_id:string){

  }
}



