import { qGetProductCategoryData } from "../database/repositories/leads-repo";

const getProductCategoryData = async (): Promise<object | undefined> => {
  try {
    const productCategoryData = await qGetProductCategoryData();
    console.log("Product category data from Q", productCategoryData);
    if (productCategoryData) {
      return {
        productCategoryData,
        message: "Product category  data fetched successfully",
        status: "OK",
      };
    } else {
      return { message: "Product category data fetching failed", status: "FAILED" };
    }
  } catch (err) {
    console.error(err);
  }
};
export default getProductCategoryData;
