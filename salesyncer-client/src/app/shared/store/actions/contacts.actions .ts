import { ContactsType,ContactType } from "src/app/shared/interfaces/interfaces";
import { createAction,props } from "@ngrx/store";


export const storeActivitiesData = createAction('[activitiesData] Store Activities Data', props<{ activitiesData: Array<ContactType> }>());

export const retrieveActivitiesData = createAction('[activitiesData] Retrieve Activities Data');

export const clearActivitiesData = createAction('[activitiesData] Clear Activities Data');
