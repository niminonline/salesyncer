import {
  qCancelLeave,
  qGetCurrentLeaveStatus,
  qSendLeaveCancelRequest
} from "../database/repositories/employeeRepo";

const cancelLeaveData = async (_id: any) => {
  try {
    if (_id) {
      const currentStatus = await qGetCurrentLeaveStatus(_id);
      console.log("Status ", currentStatus)
      if (currentStatus == "Pending") {
        const response = await qCancelLeave(_id);
        if (response) {
          return response;
        } else {
          return { status: "FAILED", message: "Leave cancellation failed" };
        }
      } else {
        const response = await qSendLeaveCancelRequest(_id);

        if (response) {
          return response;
        } else {
          return { status: "FAILED", message: "Leave cancellation failed" };
        }
      }
    } else {
      return {
        status: "FAILED",
        message: "No id found for leave cancellation",
      };
    }
  } catch (err) {
    console.error(err);
  }
};

export default cancelLeaveData;
