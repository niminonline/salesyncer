import {Lead} from "src/app/shared/interfaces/interfaces";
import { createAction,props } from "@ngrx/store";


export const storeLeadsData = createAction('[leadsData] Store Leads Data', props<{ leadsData: Array<Lead> }>());

export const retrieveLeadsData = createAction('[leadsData] Retrieve Leads Data');


