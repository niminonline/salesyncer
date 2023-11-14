import { ContactsType,ContactType } from "src/app/shared/interfaces/interfaces";
import { createAction,props } from "@ngrx/store";


export const storecontactsData = createAction('[contactsData] Store Contacts Data', props<{ contactsData: Array<ContactType> }>());

export const retrieveContactsData = createAction('[contactsData] Retrieve Contacts Data');

export const clearContactsData = createAction('[contactsData] Clear Contacts Data');
