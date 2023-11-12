import BusinessCounter from "../entities/BusinessCounter";
import Product from "../entities/products";
import ProductCategory from "../entities/productCategory";

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
    const updateOperation = {
      $set: newProductData,
    };
    const response = await Product.findByIdAndUpdate(_id, updateOperation);

    return response;
  } catch (error) {}
};

////==============================================

export const qGetProductCount = async () => {
  try {
    const counterData: any = await BusinessCounter.findOne();
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



////==============================================

export const qCreateProductCategoryData = async (newProductCategoryData: object) => {
  try {
    const newProductCategory = new ProductCategory(newProductCategoryData);

    const addProductCategoryToDB = await newProductCategory.save();
    return addProductCategoryToDB;
  } catch (error) {
    console.log(error);
  }
};


////==============================================

export const qUpdateProductCategoryDataById = async (
  _id: string,
  newProductCategoryData: any
) => {
  try {
    const updateOperation = {
      $set: newProductCategoryData,
    };
    const response = await ProductCategory.findByIdAndUpdate(_id, updateOperation);

    return response;
  } catch (error) {}
};



export const qGetProductCategoryData = async () => {
  try {
    return await ProductCategory.find({});
  } catch (error) {
    console.log(error);
  }
};




export const qDeleteProductCategoryDataById = async (_id: string) => {
  try {
    return await ProductCategory.findByIdAndRemove(_id);
  } catch (error) {
    console.log(error);
  }
};

////==============================================
