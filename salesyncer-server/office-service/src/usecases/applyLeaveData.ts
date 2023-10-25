import { qAddLeaveData } from "../database/repositories/employeeRepo";

const applyLeaveData = async (leaveData: any) => {
  try {
    if (leaveData) {
      const newLeave = {
        employeeObj_id: leaveData._id,
        startDate: leaveData.startDate,
        endDate: leaveData.endDate,
        leaveCategory: leaveData.category,
        reason: leaveData.reason,
      };

      const response = await qAddLeaveData(newLeave);
      // console.log("Response from qaddBranchData Q", response);

      if (response) {
       
        return {status:"OK",message:"Leave data added"};
     }
     else{
        return {status:"FAILED",message:"Add leave data failed"}
     }
}

  } catch (err) {
    console.error(err);
  }
};

export default applyLeaveData;
