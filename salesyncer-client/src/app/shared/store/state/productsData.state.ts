import { Product,ProductsData } from "src/app/shared/interfaces/interfaces";

export interface ProductsDataState {
  productsData: Product[]|[];
  }

  export const initialState: ProductsData = {
    productsData: [],
  };

