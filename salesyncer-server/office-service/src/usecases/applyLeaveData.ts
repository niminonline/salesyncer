import { qAddLeaveData } from "../database/repositories/employeeRepo";
import logger from "../services/winston";

const applyLeaveData = async (leaveData: any) => {
  try {
    if (leaveData) {
      const newLeave = {
        employee: leaveData._id,
        startDate: leaveData.startDate,
        endDate: leaveData.endDate,
        leaveCategory: leaveData.category,
        reason: leaveData.reason,
      };

      const response = await qAddLeaveData(newLeave);

      if (response) {
        return { status: "OK", message: "Leave data added" };
      } else {
        return { status: "FAILED", message: "Add leave data failed" };
      }
    }
  } catch (err) {
    logger.error(err);
  }
};

export default applyLeaveData;
