import Leave from "../database/entities/leave";
import { qGetLeaveRequests } from "../database/repositories/employeeRepo";

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
    console.error(err);
  }
};

export default getLeaveRequestsData;
