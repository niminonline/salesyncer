import { qUpdateActivityDataById } from "../database/repositories/activities-repo";

const editActivityData = async (newActivityData: any) => {
  try {

    if (newActivityData) {
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
    console.error(err);
  }
};

export default editActivityData;
