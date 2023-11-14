import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Router,ActivatedRoute } from '@angular/router';
import { selectContactsData } from 'src/app/shared/store/selectors/contacts.selectors';
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
    this.selectedContactData=this.contactsData.find((contact:ContactType)=>contact._id==_id);


  }

  getContactsData() {
    this.store.select(selectContactsData).subscribe((response) => {
      if (response) {
        this.contactsData = response;
      } else {
        console.error('Employee fetching from state failed');
      }
    });
  }


    navEditContact(){

      const currentroute= this.router.url;
      if(currentroute.toString().includes('admin'))
      {
        this.router.navigate(['admin/contacts-edit'],{ queryParams: {_id:this.selectedContactData._id} });
      }
      else{
        this.router.navigate(['contacts-edit'],{ queryParams: {_id:this.selectedContactData._id} });   
         }
    }


   


  navContacts(){
    const currentroute= this.router.url;
    if(currentroute.toString().includes('admin'))
    {
     this.router.navigate(['admin/contacts']);
    }
    else{
      this.router.navigate(['contacts']);
    }
  }

  
}



