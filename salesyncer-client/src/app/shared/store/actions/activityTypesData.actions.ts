import {ActivityType} from "src/app/shared/interfaces/interfaces";
import { createAction,props } from "@ngrx/store";


export const storeActivityTypesData = createAction('[activityTypesData] Store ActivityTypes Data', props<{ activityTypesData: Array<ActivityType> }>());

export const retrieveActivityTypesData = createAction('[activityTypesData] Retrieve ActivityTypes Data');


