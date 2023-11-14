import { LeadsData,Lead } from "src/app/shared/interfaces/interfaces";

export interface LeadsDataState {
  leadsData: Lead[]|[];
  }

  export const initialState: LeadsData = {
    leadsData: [],
  };

