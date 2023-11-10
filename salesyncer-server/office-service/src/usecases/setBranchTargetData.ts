import { qSetTargetByBranch } from "../database/repositories/employeeRepo";

const setBranchTargetData = async (targetData: any) => {
  try {
    const {branch}= targetData;
    if (targetData) {
      const targetDetails = {
        // _id: targetData._id,
        month: targetData.month,
        year: targetData.year,
        target: targetData.target,
      };

      const response: any = await qSetTargetByBranch(branch,targetDetails);
      if (response) {
        return { status: "OK", message: "Branch Target set successfully" };
      } else return { status: "FAILED", message: "Branch Target set failed" };
    } else {
      return { status: "FAILED", message: "Target set failed" };
    }
  } catch (err) {
    console.error(err);
  }
};
export default setBranchTargetData;
