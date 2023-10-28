import Leads from "../entities/leads";
import LeadSource from "../entities/leadSource";
import ProductCategory from "../entities/productCategory";
import Products from "../entities/products";
import BusinessCounter from "../entities/BusinessCounter";

////==============================================
export const qGetLeadsSourceData = async () => {
  try {
    return await LeadSource.find({});
  } catch (error) {
    console.log(error);
  }
};

////==============================================
////==============================================
export const qGetProductCategoryData = async () => {
  try {
    return await ProductCategory.find({});
  } catch (error) {
    console.log(error);
  }
};

////==============================================
////==============================================
export const qGetProductsData = async () => {
  try {
    return await Products.find({});
  } catch (error) {
    console.log(error);
  }
};

////==============================================
////==============================================
export const qGetLeadsData = async () => {
  try {
    return await Leads.find({});
  } catch (error) {
    console.log(error);
  }
};

////==============================================

export const qCreateLeadsData = async (newLeadData: object) => {
  try {
    const newLead = new Leads(newLeadData);
   
   const addLeadToDB=  await newLead.save();
   return addLeadToDB;
  } catch (error) {
    console.log(error);
  }
};

////==============================================

export const qGetLeadDataById = async (_id: string) => {
  try {
    return await Leads.findById(_id);
  } catch (error) {
    console.log(error);
  }
};

////==============================================

export const qUpdateLeadDataById = async (
  _id: string,
  newLeadData: object
  ) => {
    try {
      console.log("Emp id and data from leads repo",_id,newLeadData);
      const updateOperation = {
        $set: newLeadData,
      };
      // console.log("Update ops", updateOperation)
      const response = await Leads.findByIdAndUpdate(_id, updateOperation);
      // console.log("Update ops response", response)
      return response;
    } catch (error) {}
  };
  
  ////==============================================
  
  
  export const qGetLeadsCount = async () => {
    try {
      const counterData:any=  await BusinessCounter.findOne(); 
      // console.log("Counterdata",counterData.leadCounter) 
      return counterData.leadCounter;
    } catch (error) {
      console.log(error);
    }
  };
  
  ////==============================================
  ////==============================================
  
  
  export const qIncLeadCount = async () => {
    try {
      const updateCounterData:any=  await BusinessCounter.findOneAndUpdate({$inc:{leadCounter:1}});  
      return updateCounterData;
    } catch (error) {
      console.log(error);
    }
  };
  
  ////==============================================
  export const qDeleteLeadDataById = async (_id: string) => {
    try {
      return await Leads.findByIdAndRemove(_id);
    } catch (error) {
      console.log(error);
    }
  };
  
  ////==============================================