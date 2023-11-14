import { ActivitiesData,Activity } from "src/app/shared/interfaces/interfaces";

export interface ActivitiesDataState {
  activitiesData: Activity[]|[];
  }

  export const initialState: ActivitiesData = {
    activitiesData: [],
  };

