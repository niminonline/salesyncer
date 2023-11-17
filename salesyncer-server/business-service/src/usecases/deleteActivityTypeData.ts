import { qDeleteActivityTypeDataById } from "../database/repositories/activities-repo";
import logger from "../services/winston";
const deleteActivityTypeData = async (
  _id: string
): Promise<object | undefined> => {
  try {
    if (_id) {
      const deleteActivityTypeData = await qDeleteActivityTypeDataById(_id);
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
    logger.error(err);
  }
};
export default deleteActivityTypeData;
