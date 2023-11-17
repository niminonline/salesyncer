import { qGetLeadsSourceData } from "../database/repositories/leads-repo";
import logger from "../services/winston";
const getLeadSourceData = async (): Promise<object | undefined> => {
  try {
    const leadSourceData = await qGetLeadsSourceData();
    if (leadSourceData) {
      return {
        leadSourceData,
        message: "Lead source data fetched successfully",
        status: "OK",
      };
    } else {
      return { message: "Lead source data fetching failed", status: "FAILED" };
    }
  } catch (err) {
    logger.error(err);
  }
};
export default getLeadSourceData;
