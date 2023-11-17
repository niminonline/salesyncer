import { qDeleteSaleDataById } from "../database/repositories/sales-repo";
import logger from "../services/winston";
const deleteSaleData = async (_id: string): Promise<object | undefined> => {
  try {
    if (_id) {
      const deleteSaleData = await qDeleteSaleDataById(_id);
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
    logger.error(err);
  }
};
export default deleteSaleData;
