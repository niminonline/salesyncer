import { qEditTargetByemployeeId} from "../database/repositories/employeeRepo";
import logger from "../services/winston";


const editTargetData = async (newTargetData: any) => {
  try {
    const{_id}=newTargetData;
    if (newTargetData) {
      const updatedBranchData = {
        month: newTargetData.month,
        year: newTargetData.year,
        target: newTargetData.target,
      };

      const response = await qEditTargetByemployeeId(_id,newTargetData);

      if (response) {
      
        return {status:"OK",message:"Target updated successsfully"}
     }
     else{
        return {status:"FAILED",message:"Target updation failed"}
     }
}

  } catch (err) {
    logger.error(err);
  }
};

export default editTargetData;
