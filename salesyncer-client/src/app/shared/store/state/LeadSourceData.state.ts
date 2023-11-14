import { LeadSourceData,LeadSource } from "src/app/shared/interfaces/interfaces";

export interface LeadSourceDataState {
  leadSourceData: LeadSource[]|[];
  }

  export const initialState: LeadSourceData = {
    leadSourceData: [],
  };

