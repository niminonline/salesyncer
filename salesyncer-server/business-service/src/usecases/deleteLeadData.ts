import { qDeleteLeadDataById } from "../database/repositories/leads-repo";

const deleteLeadData = async (_id: string): Promise<object | undefined> => {
  try {
    if (_id) {
      const deleteLeadData = await qDeleteLeadDataById(_id);
      console.log("Lead data from Q", deleteLeadData);
      if (deleteLeadData) {
        return {
          deleteLeadData,
          message: "Lead deleted successfully",
          status: "OK",
        };
      } else {
        return { message: "Lead deletion failed", status: "FAILED" };
      }
    } else {
      return { message: "Missing _id", status: "FAILED" };
    }
  } catch (err) {
    console.error(err);
  }
};
export default deleteLeadData;
