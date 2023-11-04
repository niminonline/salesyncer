import { createReducer,on } from "@ngrx/store";
import * as ContactsActions from '../actions/contacts.actions '
import { initialState } from "../state/contacts.state ";



  export const contactsReducer = createReducer(
    initialState,
    on(ContactsActions.storecontactsData, (state, { contactsData }) => ({...state,contactsData})),
    on(ContactsActions.retrieveContactsData, (state) => state),
    on(ContactsActions.clearContactsData, (state) => initialState) 
  );
  
  

