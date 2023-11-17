import { qGetActivityDataById } from "../database/repositories/activities-repo";
import logger from "../services/winston";
const getActivityData = async (_id: string): Promise<object | undefined> => {
  try {
    if (_id) {
      const activityData = await qGetActivityDataById(_id);
      if (activityData) {
        return {
          activityData,
          message: "Activity details fetched successfully",
          status: "OK",
        };
      } else {
        return {
          message: "Activity details fetching failed",
          status: "FAILED",
        };
      }
    } else {
      return { message: "Missing _id", status: "FAILED" };
    }
  } catch (err) {
    logger.error(err);
  }
};
export default getActivityData;
