import {
  qCreateActivityData,
  qGetActivityCount,
  qIncActivityCount,
  qIsTimeCollisionExists,
} from "../database/repositories/activities-repo";
import logger from "../services/winston";

const createActivityData = async (activityData: any) => {
  try {
    const scheduledTimeInputStr = activityData.scheduledTime;
    const ownerInput = activityData.owner;
    const scheduledTimeInput = new Date(scheduledTimeInputStr);

    const checkTimeCollision: any = await qIsTimeCollisionExists(
      ownerInput,
      scheduledTimeInput
    );
    if (checkTimeCollision.length) {
      return {
        status: "FAILED",
        message: `This time slot is already alloted for ${ownerInput}. Please choose a time with 10 minutes gap.`,
      };
    }
    const activityCount = await qGetActivityCount();
    if (activityData) {
      const newActivityData = {
        activityId: "SSACT0" + activityCount,
        lead: activityData.lead,
        type: activityData.type,
        owner: activityData.owner,
        status: activityData.status,
        scheduledActivity: activityData.scheduledActivity,
        scheduledTime: activityData.scheduledTime,
        feedback: activityData.feedback,
      };

      const response: any = await qCreateActivityData(newActivityData);

      if (response) {
        const updateActivityCount = await qIncActivityCount();

        return { status: "OK", message: "Activity created successfully" };
      } else {
        return { status: "FAILED", message: "Activity creation failed" };
      }
    } else {
      return { status: "FAILED", message: "No Activity data found" };
    }
  } catch (err) {
    logger.error(err);
  }
};

export default createActivityData;
