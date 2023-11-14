import { createReducer,on } from "@ngrx/store";
import * as ProductsDataActions from '../actions/productsData.actions'
import { initialState } from "../state/productsData.state";



  export const productsDataReducer = createReducer(
    initialState,
    on(ProductsDataActions.storeProductsData, (state, { productsData }) => ({...state,productsData})),
    on(ProductsDataActions.retrieveProductsData, (state) => state),
  );
  
  

