import { qGetSaleDataById } from "../database/repositories/sales-repo";

const getSaleData = async (_id: string): Promise<object | undefined> => {
  try {
    if (_id) {
      const saleData = await qGetSaleDataById(_id);
      if (saleData) {
        return {
            saleData,
          message: "Sale details fetched successfully",
          status: "OK",
        };
      } else {
        return { message: "Sale details fetching failed", status: "FAILED" };
      }
    } else {
      return { message: "Missing _id", status: "FAILED" };
    }
  } catch (err) {
    console.error(err);
  }
};
export default getSaleData;
