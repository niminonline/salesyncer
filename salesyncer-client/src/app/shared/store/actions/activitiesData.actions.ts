import {Activity} from "src/app/shared/interfaces/interfaces";
import { createAction,props } from "@ngrx/store";


export const storeActivitiesData = createAction('[activitiesData] Store Activities Data', props<{ activitiesData: Array<Activity> }>());

export const retrieveActivitiesData = createAction('[activitiesData] Retrieve Activities Data');


