import { qGetActivityTypesData } from "../database/repositories/activities-repo";
import logger from "../services/winston";

const getActivityTypesData = async (): Promise<object | undefined> => {
  try {
    const activityTypesData = await qGetActivityTypesData();
    if (activityTypesData) {
      return {
        activityTypesData,
        message: "Activity types data fetched successfully",
        status: "OK",
      };
    } else {
      return {
        message: "Activity types data fetching failed",
        status: "FAILED",
      };
    }
  } catch (err) {
    logger.error(err);
  }
};
export default getActivityTypesData;
