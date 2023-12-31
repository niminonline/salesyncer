import { qUpdateProductCategoryDataById } from "../database/repositories/products-repo";
import logger from "../services/winston";
const editProductCategoryData = async (newProductCategoryData: any) => {
  try {
    if (newProductCategoryData) {
      const { _id } = newProductCategoryData;
      const dataToUpdate = {
        productCategory: newProductCategoryData.productCategory,
      };

      const updateResponse = await qUpdateProductCategoryDataById(
        _id,
        dataToUpdate
      );
      if (updateResponse) {
        return {
          status: "OK",
          message: "Product Category updated successfully",
        };
      } else {
        return {
          status: "FAILED",
          message: "Product Category updation Failed",
        };
      }
    } else {
      return { status: "FAILED", message: "No update data found" };
    }
  } catch (err) {
    logger.error(err);
  }
};

export default editProductCategoryData;
