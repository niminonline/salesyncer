import { qGetBranchData } from "../database/repositories/officeRepo";
import logger from "../services/winston";

const getBranchData = async (): Promise<object | undefined> => {
  try {
    const branchData = await qGetBranchData();
    if (branchData) {
      return {
        branchData,
        message: " Branch data fetched successfully",
        status: "OK",
      };
    } else {
      return { message: "Branch data fetching failed", status: "FAILED" };
    }
  } catch (err) {
    logger.error(err);
  }
};

export default getBranchData;
