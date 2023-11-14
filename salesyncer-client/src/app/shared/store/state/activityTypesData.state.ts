import { ActivityTypesData, ActivityType } from "src/app/shared/interfaces/interfaces";

export interface ActivityTypesDataState {
  activityTypesData: ActivityType[]|[];
  }

  export const initialState: ActivityTypesData = {
    activityTypesData: [],
  };

