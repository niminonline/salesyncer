import { qUpdateAchievedTarget } from "../database/repositories/employeeRepo";
import logger from "../services/winston";

const updateAchievedTargetData = async (targetData: any) => {
  try {
    const { _id } = targetData;
    if (targetData) {
      const targetDetails = {
        // _id: targetData._id,
        month: targetData.month,
        year: targetData.year,
        sale: targetData.sale,
      };

      const response: any = await qUpdateAchievedTarget(_id, targetDetails);
      if (response) {
        return { status: "OK", message: "Achieved target set successfully" };
      } else return { status: "FAILED", message: "Target set failed" };
    } else {
      return { status: "FAILED", message: "Target set failed" };
    }
  } catch (err) {
    logger.error(err);
  }
};
export default updateAchievedTargetData;
