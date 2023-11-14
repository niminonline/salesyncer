import {Sale} from "src/app/shared/interfaces/interfaces";
import { createAction,props } from "@ngrx/store";


export const storeSalesData = createAction('[salesData] Store Products Data', props<{ salesData: Array<Sale> }>());

export const retrieveSalesData = createAction('[salesData] Retrieve Products Data');


