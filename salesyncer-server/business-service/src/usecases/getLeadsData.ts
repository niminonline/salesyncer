import { qGetLeadsData } from "../database/repositories/leads-repo";

const getLeadsData = async (): Promise<object | undefined> => {
  try {
    const leadsData = await qGetLeadsData();
    if (leadsData) {
      return {
        leadsData,
        message: "Leads data fetched successfully",
        status: "OK",
      };
    } else {
      return { message: "Leads data fetching failed", status: "FAILED" };
    }
  } catch (err) {
    console.error(err);
  }
};
export default getLeadsData;
