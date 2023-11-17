import { qCreateProductCategoryData } from "../database/repositories/products-repo";
import logger from "../services/winston";
const createProductCategoryData = async (productCategoryData: any) => {
  try {
    if (productCategoryData) {
      const newProductCategoryData = {
        productCategory: productCategoryData.productCategory,
      };

      const response: any = await qCreateProductCategoryData(
        newProductCategoryData
      );

      if (response) {
        return {
          status: "OK",
          message: "Product Category created successfully",
        };
      } else {
        return {
          status: "FAILED",
          message: "Product Category creation failed",
        };
      }
    } else {
      return { status: "FAILED", message: "No Product Category data found" };
    }
  } catch (err) {
    logger.error(err);
  }
};

export default createProductCategoryData;
