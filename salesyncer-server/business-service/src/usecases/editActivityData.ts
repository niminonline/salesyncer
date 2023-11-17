import {
  qIsTimeCollisionExists,
  qUpdateActivityDataById,
} from "../database/repositories/activities-repo";
import logger from "../services/winston";
const editActivityData = async (newActivityData: any) => {
  try {
    if (newActivityData) {
      const scheduledTimeInputStr = newActivityData.scheduledTime;
      const ownerInput = newActivityData.owner;
      const scheduledTimeInput = new Date(scheduledTimeInputStr);

      const checkTimeCollision: any = await qIsTimeCollisionExists(
        ownerInput,
        scheduledTimeInput
      );
      if (
        checkTimeCollision.length > 1 ||
        (checkTimeCollision.length == 1 &&
          newActivityData._id !== checkTimeCollision[0]._id.toString())
      ) {
        return {
          status: "FAILED",
          message: `This time slot is already alloted for ${ownerInput}. Please choose a time with atleast 10 minutes gap.`,
        };
      }

      const { _id } = newActivityData;
      const dataToUpdate = {
        lead: newActivityData.lead,
        type: newActivityData.type,
        owner: newActivityData.owner,
        status: newActivityData.status,
        scheduledActivity: newActivityData.scheduledActivity,
        scheduledTime: newActivityData.scheduledTime,
        feedback: newActivityData.feedback,
      };

      const updateResponse = await qUpdateActivityDataById(_id, dataToUpdate);
      if (updateResponse) {
        return { status: "OK", message: "Activity updated successfully" };
      } else {
        return { status: "FAILED", message: "Activity updation Failed" };
      }
    } else {
      return { status: "FAILED", message: "No update data found" };
    }
  } catch (err) {
    logger.error(err);
  }
};

export default editActivityData;
