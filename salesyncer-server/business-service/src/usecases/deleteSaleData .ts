import { qDeleteSaleDataById } from "../database/repositories/sales-repo";

const deleteSaleData = async (_id: string): Promise<object | undefined> => {
  try {
    if (_id) {
      const deleteSaleData = await qDeleteSaleDataById(_id);
      console.log("Sale data from Q", deleteSaleData);
      if (deleteSaleData) {
        return {
            deleteSaleData,
          message: "Sale deleted successfully",
          status: "OK",
        };
      } else {
        return { message: "Sale deletion failed", status: "FAILED" };
      }
    } else {
      return { message: "Missing _id", status: "FAILED" };
    }
  } catch (err) {
    console.error(err);
  }
};
export default deleteSaleData;
