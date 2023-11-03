import { qGetSalesData } from "../database/repositories/sales-repo";

const getSalesData = async (): Promise<object | undefined> => {
  try {
    const salesData = await qGetSalesData();
    console.log("sales  data from Q", salesData);
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
    console.error(err);
  }
};
export default getSalesData;
