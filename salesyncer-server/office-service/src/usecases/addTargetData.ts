import { qSetTargetByemployeeId } from "../database/repositories/employeeRepo";
import logger from "../services/winston";

const addTargetData = async (targetData: any) => {
  try {
    const {_id}= targetData;
    if (targetData) {
      const targetDetails = {
        // _id: targetData._id,
        month: targetData.month,
        year: targetData.year,
        target: targetData.target,
        remaining: targetData.target,
      };

      const response: any = await qSetTargetByemployeeId(_id,targetDetails);
      if (response) {
        return { status: "OK", message: "Target set successfully" };
      } else return { status: "FAILED", message: "Target set failed" };
    } else {
      return { status: "FAILED", message: "Target set failed" };
    }
  } catch (err) {
    logger.error(err);
  }
};
export default addTargetData;
