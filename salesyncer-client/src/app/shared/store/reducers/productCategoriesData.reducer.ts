import { createReducer,on } from "@ngrx/store";
import * as ProductCategoriesDataActions from '../actions/productCategoriesData.actions'
import { initialState } from "../state/ProductCategoriesData.state";



  export const productCategoriesDataReducer = createReducer(
    initialState,
    on(ProductCategoriesDataActions.storeProductCategoriesData, (state, { productCategoriesData }) => ({...state,productCategoriesData})),
    on(ProductCategoriesDataActions.retrieveProductCategoriesData, (state) => state),
  );
  
  

