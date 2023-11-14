import { ProductCategoriesData,ProductCategory } from "src/app/shared/interfaces/interfaces";

export interface ProductCategoriesDataState {
  productCategoriesData: ProductCategory[]|[];
  }

  export const initialState: ProductCategoriesData = {
    productCategoriesData: [],
  };

