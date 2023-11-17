import { qGetProductsData } from "../database/repositories/products-repo";
import logger from "../services/winston";
const getProductsData = async (): Promise<object | undefined> => {
  try {
    const productsData = await qGetProductsData();
    if (productsData) {
      return {
        productsData,
        message: "Products data fetched successfully",
        status: "OK",
      };
    } else {
      return { message: "Products data fetching failed", status: "FAILED" };
    }
  } catch (err) {
    logger.error(err);
  }
};
export default getProductsData;
