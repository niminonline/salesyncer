// import { Injectable } from '@angular/core';
// import { Actions, createEffect, ofType } from '@ngrx/effects';
// import { of } from 'rxjs';
// import { catchError, map, switchMap } from 'rxjs';
// import * as ContactsActions from '../actions/contacts.actions';
// import { SharedApiService } from 'src/app/shared/services/shared-api.service';
// import { ContactsType } from 'src/app/shared/interfaces/interfaces';
// import { Store } from '@ngrx/store';

// @Injectable()
// export class ContactsEffects {
//   constructor(
//     private actions$: Actions,
//     private sharedApi: SharedApiService,
//     private store: Store
//   ) {}

//   private defaultContacts: ContactsType =  {
//       contactsData: [
//       {
//           _id: "",
//           contactId: "",
//           contactName: "",
//           email: "",
//           phone: "",
//           alternatePhone: "",
//           company: "",
//           profession: "",
//           language: "",
//       },
 
//   ]
// }


//   retrieveContactsData$ = createEffect(() =>
//     this.actions$.pipe(
//       ofType(ContactsActions.retrieveContactsData),
//       switchMap(() => {
       
//         return this.sharedApi.getContacts().pipe(
//           map((response) =>
//             ContactsActions.storecontactsData({
//               contactsData: response.contactData || this.defaultContacts,
//             })
//           ),
//           catchError(() => of({ type: 'error' }))
//         );
//       })
//     )
//   );
// }


import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators'; // Import 'tap'
import * as ContactsActions from '../actions/contacts.actions';
import { SharedApiService } from 'src/app/shared/services/shared-api.service';
import { ContactsType } from 'src/app/shared/interfaces/interfaces';
import { Store } from '@ngrx/store';

@Injectable()
export class ContactsEffects {
  constructor(
    private actions$: Actions,
    private sharedApi: SharedApiService,
    private store: Store
  ) {}

  private defaultContacts: ContactsType = {
    contactsData: [
      {
        _id: "",
        contactId: "",
        name: "",
        email: "",
        branch:"",
        phone: "",
        company: "",
        profession: "",
        type: "",
        address:"",
        place:"",
        pincode:"",
        language: "",
      },
    ],
  };

  retrieveContactsData$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ContactsActions.retrieveContactsData),
      switchMap(() => {
        return this.sharedApi.getContacts().pipe(
          tap((response) => {
            console.log('API Response:', response); 
          }),
          map((response) =>
            ContactsActions.storecontactsData({
              contactsData: response.contactsData || this.defaultContacts,
            })
          ),
          catchError(() => of({ type: 'error' }))
        );
      })
    )
  );
}
