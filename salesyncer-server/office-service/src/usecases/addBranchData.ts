import { qaddBranchData,qGetBranchData } from "../database/repositories/officeRepo";

import { publishAndResponse } from "../services/redisOps";

const addBranchData = async (branchData: any) => {
  try {
    if (branchData) {
      const newBranch = {
        branchCode: branchData.branchCode,
        branchName: branchData.branchName,
        location: branchData.location,
      };

      const response = await qaddBranchData(newBranch);
      console.log("Response from qaddBranchData Q", response);

      if (response) {
       const allBranchData:any= await qGetBranchData();
       allBranchData.status="OK";
       allBranchData.message="Branch added successfully";
       console.log("All branch data from addbranch data",allBranchData)
        return allBranchData;
     }
     else{
        return {status:"FAILED",message:"Create branch failed"}
     }
}

  } catch (err) {
    console.error(err);
  }
};

export default addBranchData;
