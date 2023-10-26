import { qDoleaveAction } from "../database/repositories/employeeRepo";
import  moment from 'moment';

const leaveAction = async (leaveActionData: any) => {
  try {
    if (leaveActionData) {

      const { _id,toDo} =leaveActionData;

      const response = await qDoleaveAction(_id,toDo);
      // console.log("Response from qaddBranchData Q", response);

      if (response) {
       
        return response;
     }
     else{
        return {status:"FAILED",message:"Leave action failed"}
     }
}

  } catch (err) {
    console.error(err);
  }
};

export default leaveAction;
