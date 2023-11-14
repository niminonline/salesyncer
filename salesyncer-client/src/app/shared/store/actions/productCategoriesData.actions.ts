import {ProductCategory} from "src/app/shared/interfaces/interfaces";
import { createAction,props } from "@ngrx/store";


export const storeProductCategoriesData = createAction('[productCategoriesData] Store ProductCategories Data', props<{ productCategoriesData: Array<ProductCategory> }>());

export const retrieveProductCategoriesData = createAction('[productCategoriesData] Retrieve ProductCategories Data');


