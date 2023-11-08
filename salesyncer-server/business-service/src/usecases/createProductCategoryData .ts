  
  import { qCreateProductCategoryData} from "../database/repositories/products-repo"
  
  const createProductCategoryData = async (productCategoryData: any) => {
    try {
      if (productCategoryData) {
  
          const newProductCategoryData = {
            productCategory: productCategoryData.productCategory,
      
          
        };
  
        const response: any = await qCreateProductCategoryData(newProductCategoryData);
        // console.log("Response from qProductCategoryData Q", response);
  
        if (response) {
        
  
          return { status: "OK", message: "Product Category created successfully" };
        } else {
          return { status: "FAILED", message: "Product Category creation failed" };
        }
      } else {
        return { status: "FAILED", message: "No Product Category data found" };
      }
    } catch (err) {
      console.error(err);
    }
  };
  
  export default createProductCategoryData;
  