import { qGetProductDataById } from "../database/repositories/products-repo";
import logger from "../services/winston";
const getProductData = async (_id: string): Promise<object | undefined> => {
  try {
    if (_id) {
      const productData = await qGetProductDataById(_id);
      if (productData) {
        return {
          productData,
          message: "Product details fetched successfully",
          status: "OK",
        };
      } else {
        return { message: "Product details fetching failed", status: "FAILED" };
      }
    } else {
      return { message: "Missing _id", status: "FAILED" };
    }
  } catch (err) {
    logger.error(err);
  }
};
export default getProductData;
