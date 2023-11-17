import {
  qaddBranchData,
  qGetBranchData,
} from "../database/repositories/officeRepo";
import logger from "../services/winston";

const addBranchData = async (branchData: any) => {
  try {
    if (branchData) {
      const newBranch = {
        branchCode: branchData.branchCode,
        branchName: branchData.branchName,
        location: branchData.location,
      };

      const response = await qaddBranchData(newBranch);

      if (response) {
        const allBranchData: any = await qGetBranchData();
        allBranchData.status = "OK";
        allBranchData.message = "Branch added successfully";
        95;
        return allBranchData;
      } else {
        return { status: "FAILED", message: "Create branch failed" };
      }
    }
  } catch (err) {
    logger.error(err);
  }
};

export default addBranchData;
