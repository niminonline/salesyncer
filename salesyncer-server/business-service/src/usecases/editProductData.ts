import { qUpdateProductDataById } from "../database/repositories/products-repo";
import logger from "../services/winston";
const editProductData = async (newProductData: any) => {
  try {
    if (newProductData) {
      const { _id } = newProductData;
      const dataToUpdate = {
        name: newProductData.name,
        category: newProductData.category,
        status: newProductData.status,
        mrp: newProductData.mrp,
        lsp: newProductData.lsp,
      };

      const updateResponse = await qUpdateProductDataById(_id, dataToUpdate);
      if (updateResponse) {
        return { status: "OK", message: "Product updated successfully" };
      } else {
        return { status: "FAILED", message: "Product updation Failed" };
      }
    } else {
      return { status: "FAILED", message: "No update data found" };
    }
  } catch (err) {
    logger.error(err);
  }
};

export default editProductData;
