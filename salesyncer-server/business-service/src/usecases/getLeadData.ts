import { qGetLeadDataById } from "../database/repositories/leads-repo";

const getLeadData = async (_id: string): Promise<object | undefined> => {
  try {
    if (_id) {
      const leadData = await qGetLeadDataById(_id);
      // console.log("Employee data from Q", employeeData);
      if (leadData) {
        return {
          leadData,
          message: "Lead details fetched successfully",
          status: "OK",
        };
      } else {
        return { message: "Lead details fetching failed", status: "FAILED" };
      }
    } else {
      return { message: "Missing _id", status: "FAILED" };
    }
  } catch (err) {
    console.error(err);
  }
};
export default getLeadData;
