import { qGetSalesData } from "../database/repositories/sales-repo";
import logger from "../services/winston";
const getSalesData = async (): Promise<object | undefined> => {
  try {
    const salesData = await qGetSalesData();
    if (salesData) {
      return {
        salesData,
        message: "Sales data fetched successfully",
        status: "OK",
      };
    } else {
      return { message: "Sales data fetching failed", status: "FAILED" };
    }
  } catch (err) {
    logger.error(err);
  }
};
export default getSalesData;
