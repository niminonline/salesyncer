import {LeadSource} from "src/app/shared/interfaces/interfaces";
import { createAction,props } from "@ngrx/store";


export const storeLeadSourceData = createAction('[LeadSourceData] Store LeadSource Data', props<{ leadSourceData: Array<LeadSource> }>());

export const retrieveLeadSourceData = createAction('[LeadSourceData] Retrieve LeadSource Data');


