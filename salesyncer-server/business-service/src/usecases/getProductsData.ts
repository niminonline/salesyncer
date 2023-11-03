import { qGetProductsData } from "../database/repositories/products-repo";

const getProductsData = async (): Promise<object | undefined> => {
  try {
    const productsData = await qGetProductsData();
    console.log("products  data from Q", productsData);
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
    console.error(err);
  }
};
export default getProductsData;
