import { qCreateLeadSourceData } from "../database/repositories/leads-repo";
import logger from "../services/winston";
const createLeadSourceData = async (leadSourceData: any) => {
  try {
    if (leadSourceData) {
      const newLeadSourceData = {
        leadSource: leadSourceData.leadSource,
      };

      const response: any = await qCreateLeadSourceData(newLeadSourceData);

      if (response) {
        return { status: "OK", message: "Lead Source created successfully" };
      } else {
        return { status: "FAILED", message: "Lead Source creation failed" };
      }
    } else {
      return { status: "FAILED", message: "No Lead Source data found" };
    }
  } catch (err) {
    logger.error(err);
  }
};

export default createLeadSourceData;
