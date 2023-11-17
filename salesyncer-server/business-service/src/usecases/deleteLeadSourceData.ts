import { qDeleteLeadSourceById } from "../database/repositories/leads-repo";
import logger from "../services/winston";
const deleteLeadSourceData = async (
  _id: string
): Promise<object | undefined> => {
  try {
    if (_id) {
      const deleteLeadSourceData = await qDeleteLeadSourceById(_id);
      if (deleteLeadSourceData) {
        return {
          deleteLeadSourceData,
          message: "Lead Source deleted successfully",
          status: "OK",
        };
      } else {
        return { message: "Lead Source deletion failed", status: "FAILED" };
      }
    } else {
      return { message: "Missing _id", status: "FAILED" };
    }
  } catch (err) {
    logger.error(err);
  }
};
export default deleteLeadSourceData;
