import { qGetProductDataById } from "../database/repositories/products-repo";

const getProductData = async (_id: string): Promise<object | undefined> => {
  try {
    if (_id) {
      const productData = await qGetProductDataById(_id);
      // console.log("Product data from Q", productData);
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
    console.error(err);
  }
};
export default getProductData;
