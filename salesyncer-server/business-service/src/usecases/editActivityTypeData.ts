import { qUpdateActivityTypeDataById } from "../database/repositories/activities-repo";
import logger from "../services/winston";
const editActivityTypeData = async (newActivityTypeData: any) => {
  try {
    if (newActivityTypeData) {
      const { _id } = newActivityTypeData;
      const dataToUpdate = {
        activityType: newActivityTypeData.activityType,
      };

      const updateResponse = await qUpdateActivityTypeDataById(
        _id,
        dataToUpdate
      );
      if (updateResponse) {
        return { status: "OK", message: "ActivityType updated successfully" };
      } else {
        return { status: "FAILED", message: "ActivityType updation Failed" };
      }
    } else {
      return { status: "FAILED", message: "No update data found" };
    }
  } catch (err) {
    logger.error(err);
  }
};

export default editActivityTypeData;
