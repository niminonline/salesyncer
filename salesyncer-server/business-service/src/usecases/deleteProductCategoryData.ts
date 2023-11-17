import { qDeleteProductCategoryDataById } from "../database/repositories/products-repo";
import logger from "../services/winston";
const deleteProductCategoryData = async (
  _id: string
): Promise<object | undefined> => {
  try {
    if (_id) {
      const deleteProductCategoryData = await qDeleteProductCategoryDataById(
        _id
      );
      if (deleteProductCategoryData) {
        return {
          deleteProductCategoryData,
          message: "ProductCategory deleted successfully",
          status: "OK",
        };
      } else {
        return { message: "ProductCategory deletion failed", status: "FAILED" };
      }
    } else {
      return { message: "Missing _id", status: "FAILED" };
    }
  } catch (err) {
    logger.error(err);
  }
};
export default deleteProductCategoryData;
