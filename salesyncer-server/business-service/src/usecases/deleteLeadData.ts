import { qDeleteLeadDataById } from "../database/repositories/leads-repo";
import logger from "../services/winston";
const deleteLeadData = async (_id: string): Promise<object | undefined> => {
  try {
    if (_id) {
      const deleteLeadData = await qDeleteLeadDataById(_id);
      if (deleteLeadData) {
        return {
          deleteLeadData,
          message: "Lead deleted successfully",
          status: "OK",
        };
      } else {
        return { message: "Lead deletion failed", status: "FAILED" };
      }
    } else {
      return { message: "Missing _id", status: "FAILED" };
    }
  } catch (err) {
    logger.error(err);
  }
};
export default deleteLeadData;
