import { qGetLeaveRequests } from "../database/repositories/employeeRepo";
import logger from "../services/winston";

const getLeaveRequestsData = async (): Promise<object | undefined> => {
  try {
    const leaveRequestsData = await qGetLeaveRequests();
    if (leaveRequestsData) {
      return {
        leaveRequestsData,
        message: " Leave requests fetched successfully",
        status: "OK",
      };
    } else {
      return { message: "Leave requests fetching failed", status: "FAILED" };
    }
  } catch (err) {
    logger.error(err);
  }
};

export default getLeaveRequestsData;
