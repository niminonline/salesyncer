import { Sale,SalesData } from "src/app/shared/interfaces/interfaces";

export interface SalesDataState {
  salesData: Sale[]|[];
  }

  export const initialState: SalesData = {
    salesData: [],
  };

