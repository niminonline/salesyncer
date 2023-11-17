import { qDoleaveAction } from "../database/repositories/employeeRepo";
import logger from "../services/winston";
const leaveAction = async (leaveActionData: any) => {
  try {
    if (leaveActionData) {
      const { _id, toDo } = leaveActionData;

      const response = await qDoleaveAction(_id, toDo);

      if (response) {
        return response;
      } else {
        return { status: "FAILED", message: "Leave action failed" };
      }
    }
  } catch (err) {
    logger.error(err);
  }
};

export default leaveAction;
