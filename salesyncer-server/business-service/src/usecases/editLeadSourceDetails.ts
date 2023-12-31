import { qUpdateLeadSourceDataById } from "../database/repositories/leads-repo";
import logger from "../services/winston";
const editLeadSourceData = async (newLeadSourceData: any) => {
  try {
    if (newLeadSourceData) {
      const { _id } = newLeadSourceData;
      const dataToUpdate = {
        leadSource: newLeadSourceData.leadSource,
      };

      const updateResponse = await qUpdateLeadSourceDataById(_id, dataToUpdate);
      if (updateResponse) {
        return { status: "OK", message: "Lead Source updated successfully" };
      } else {
        return { status: "FAILED", message: "Lead Source updation Failed" };
      }
    } else {
      return { status: "FAILED", message: "No update data found" };
    }
  } catch (err) {
    logger.error(err);
  }
};

export default editLeadSourceData;
