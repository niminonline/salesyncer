import {Product} from "src/app/shared/interfaces/interfaces";
import { createAction,props } from "@ngrx/store";


export const storeProductsData = createAction('[productsData] Store Products Data', props<{ productsData: Array<Product> }>());

export const retrieveProductsData = createAction('[productsData] Retrieve Products Data');


