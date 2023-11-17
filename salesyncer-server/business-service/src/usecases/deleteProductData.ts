import { qDeleteProductDataById } from "../database/repositories/products-repo";
import logger from "../services/winston";
const deleteProductData = async (_id: string): Promise<object | undefined> => {
  try {
    if (_id) {
      const deleteProductData = await qDeleteProductDataById(_id);
      if (deleteProductData) {
        return {
          deleteProductData,
          message: "Product deleted successfully",
          status: "OK",
        };
      } else {
        return { message: "Product deletion failed", status: "FAILED" };
      }
    } else {
      return { message: "Missing _id", status: "FAILED" };
    }
  } catch (err) {
    logger.error(err);
  }
};
export default deleteProductData;
