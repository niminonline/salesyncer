import { qGetLeadDataById } from "../database/repositories/leads-repo";
import logger from "../services/winston";
const getLeadData = async (_id: string): Promise<object | undefined> => {
  try {
    if (_id) {
      const leadData = await qGetLeadDataById(_id);
      if (leadData) {
        return {
          leadData,
          message: "Lead details fetched successfully",
          status: "OK",
        };
      } else {
        return { message: "Lead details fetching failed", status: "FAILED" };
      }
    } else {
      return { message: "Missing _id", status: "FAILED" };
    }
  } catch (err) {
    logger.error(err);
  }
};
export default getLeadData;
