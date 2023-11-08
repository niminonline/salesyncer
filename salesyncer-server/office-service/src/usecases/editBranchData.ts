import { qaddBranchData,qGetBranchData, qUpdateBranchDataById } from "../database/repositories/officeRepo";


const editBranchData = async (branchData: any) => {
  try {
    const{_id}=branchData;
    if (branchData) {
      const updatedBranchData = {
        branchCode: branchData.branchCode,
        branchName: branchData.branchName,
        location: branchData.location,
      };

      const response = await qUpdateBranchDataById(_id,updatedBranchData);

      if (response) {
      
        return {status:"OK",message:"Branch updated successsfully"}
     }
     else{
        return {status:"FAILED",message:"Branch updation failed"}
     }
}

  } catch (err) {
    console.error(err);
  }
};

export default editBranchData;
