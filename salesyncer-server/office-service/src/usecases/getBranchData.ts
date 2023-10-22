import { qEmployeeDataByEmail } from "../database/repositories/employeeRepo";
import { qGetBranchData } from "../database/repositories/officeRepo";

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
    console.error(err);
  }
};

export default getBranchData;
