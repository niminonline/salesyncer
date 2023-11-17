import { qGetProductCategoryData } from "../database/repositories/products-repo";
import logger from "../services/winston";
const getProductCategoryData = async (): Promise<object | undefined> => {
  try {
    const productCategoriesData = await qGetProductCategoryData();
    if (productCategoriesData) {
      return {
        productCategoriesData,
        message: "Product categories  data fetched successfully",
        status: "OK",
      };
    } else {
      return {
        message: "Product categories data fetching failed",
        status: "FAILED",
      };
    }
  } catch (err) {
    logger.error(err);
  }
};
export default getProductCategoryData;
