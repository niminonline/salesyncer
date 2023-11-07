import { qfetchLeaveData } from "../database/repositories/employeeRepo";

const fetchLeaveData = async (data:any): Promise<object | undefined> => {
  try {
    const {_id,startDate,endDate}=data;
    const leavesData = await qfetchLeaveData(_id,startDate,endDate);
    if (leavesData) {
      return {
        leavesData,
        message: " Leave data fetched successfully",
        status: "OK",
      };
    } else {
      return { message: "Leave data fetching failed", status: "FAILED" };
    }
  } catch (err) {
    console.error(err);
  }
};

export default fetchLeaveData;
