import { qGetLeadsSourceData } from "../database/repositories/leads-repo";

const getLeadSourceData = async (): Promise<object | undefined> => {
  try {
    const leadSourceData = await qGetLeadsSourceData();
    if (leadSourceData) {
      return {
        leadSourceData,
        message: "Lead source data fetched successfully",
        status: "OK",
      };
    } else {
      return { message: "Lead source data fetching failed", status: "FAILED" };
    }
  } catch (err) {
    console.error(err);
  }
};
export default getLeadSourceData;
