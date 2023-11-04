import { ContactsType,ContactType } from "src/app/shared/interfaces/interfaces";

export interface ContactsState {
  contactsData: ContactType[]|[];
  }

  export const initialState: ContactsType = {
    contactsData: [],
  };


