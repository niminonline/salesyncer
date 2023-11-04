import { qDeleteActivityTypeDataById } from "../database/repositories/activities-repo";

const deleteActivityTypeData = async (_id: string): Promise<object | undefined> => {
  try {
    if (_id) {
      const deleteActivityTypeData = await qDeleteActivityTypeDataById(_id);
      console.log("ActivityType data from Q", deleteActivityTypeData);
      if (deleteActivityTypeData) {
        return {
            deleteActivityTypeData,
          message: "ActivityType deleted successfully",
          status: "OK",
        };
      } else {
        return { message: "ActivityType deletion failed", status: "FAILED" };
      }
    } else {
      return { message: "Missing _id", status: "FAILED" };
    }
  } catch (err) {
    console.error(err);
  }
};
export default deleteActivityTypeData;
