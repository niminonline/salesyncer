import { qUpdateActivityTypeDataById } from "../database/repositories/activities-repo";

const editActivityTypeData = async (newActivityTypeData: any) => {
  try {
    // console.log("New activityType data from business service", newActivityTypeData);

    if (newActivityTypeData) {
      const { _id } = newActivityTypeData;
      const dataToUpdate = {
        
        activityType: newActivityTypeData.activityType,
      };

      const updateResponse = await qUpdateActivityTypeDataById(_id, dataToUpdate);
      if (updateResponse) {
        return { status: "OK", message: "ActivityType updated successfully" };
      } else {
        return { status: "FAILED", message: "ActivityType updation Failed" };
      }
    } else {
      return { status: "FAILED", message: "No update data found" };
    }
  } catch (err) {
    console.error(err);
  }
};

export default editActivityTypeData;
