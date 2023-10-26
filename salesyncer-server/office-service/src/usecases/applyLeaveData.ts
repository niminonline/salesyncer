import { qAddLeaveData } from "../database/repositories/employeeRepo";
import  moment from 'moment';

const applyLeaveData = async (leaveData: any) => {
  try {
    if (leaveData) {
      // const parsedStartDate= moment(leaveData.startDate);
      // const parsedEndDate= moment( leaveData.endDate);
      // const formattedStartDate= parsedStartDate.format('DD-MM-YYYY');
      // const formattedEndDate= parsedEndDate.format('DD-MM-YYYY');
      const newLeave = {
        employee: leaveData._id,
        startDate: leaveData.startDate,
        endDate:leaveData.endDate,
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
