import BusinessCounter from "../entities/BusinessCounter";
import Product from "../entities/products";

////==============================================
export const qGetProductsData = async () => {
  try {
    return await Product.find({}).sort({ _id: -1 });
  } catch (error) {
    console.log(error);
  }
};

////==============================================

export const qCreateProductData = async (newProductData: object) => {
  try {
    const newProduct = new Product(newProductData);

    const addProductToDB = await newProduct.save();
    return addProductToDB;
  } catch (error) {
    console.log(error);
  }
};

////==============================================

export const qGetProductDataById = async (_id: string) => {
  try {
    return await Product.findById(_id);
  } catch (error) {
    console.log(error);
  }
};

////==============================================

export const qUpdateProductDataById = async (
  _id: string,
  newProductData: any
) => {
  try {
    console.log("New Product data to update", _id, newProductData);
    const updateOperation = {
      $set: newProductData,
    };
    // console.log("Update ops", updateOperation)
    const response = await Product.findByIdAndUpdate(_id, updateOperation);

    return response;
  } catch (error) {}
};

////==============================================

export const qGetProductCount = async () => {
  try {
    const counterData: any = await BusinessCounter.findOne();
    // console.log("Counterdata",counterData.saleCounter)
    return counterData.productCounter;
  } catch (error) {
    console.log(error);
  }
};

////==============================================
////==============================================

export const qIncProductCount = async () => {
  try {
    const updateProductData: any = await BusinessCounter.findOneAndUpdate({
      $inc: { productCounter: 1 },
    });
    return updateProductData;
  } catch (error) {
    console.log(error);
  }
};

////==============================================
export const qDeleteProductDataById = async (_id: string) => {
  try {
    return await Product.findByIdAndRemove(_id);
  } catch (error) {
    console.log(error);
  }
};

////==============================================
