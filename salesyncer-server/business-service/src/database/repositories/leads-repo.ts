import Leads from "../entities/leads";
import LeadSource from "../entities/leadSource";
import ProductCategory from "../entities/productCategory";
import Products from "../entities/products";
import BusinessCounter from "../entities/BusinessCounter";
import moment from 'moment';


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
    return await Leads.find({}).populate('client').sort({_id:-1});
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
    return await Leads.findById(_id).populate('client');
  } catch (error) {
    console.log(error);
  }
};

////==============================================

export const qUpdateLeadDataById = async (
  _id: string,
  newLeadData: any
  ) => {
    try {
      const updateOperation = {
        $set: newLeadData,
      };
      const response = await Leads.findByIdAndUpdate(_id, updateOperation);
      if(response){
        const currentDate = moment().format('DD/MM/YYYY hh:mm a');
        
        await Leads.findByIdAndUpdate(_id,{$push:{log:`${currentDate}: Lead updated by ${newLeadData.owner}`}})
      }
      return response;
    } catch (error) {}
  };
  
  ////==============================================
  
  
  export const qGetLeadsCount = async () => {
    try {
      const counterData:any=  await BusinessCounter.findOne(); 
      return counterData.leadCounter;
    } catch (error) {
      console.log(error);
    }
  };
  

  
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
  ////=====================Lead Source=========================
  
  
  export const qCreateLeadSourceData = async (newLeadSourceData: object) => {
    try {
      const newLeadSource = new LeadSource(newLeadSourceData);
  
      const addLeadSourceToDB = await newLeadSource.save();
      return addLeadSourceToDB;
    } catch (error) {
      console.log(error);
    }
  };

  
  export const qUpdateLeadSourceDataById = async (
    _id: string,
    newLeadSourceData: any
  ) => {
    try {
      const updateOperation = {
        $set: newLeadSourceData,
      };
      const response = await LeadSource.findByIdAndUpdate(_id, updateOperation);
  
      return response;
    } catch (error) {}
  };
  
  
  
  export const qGetLeadsSourceData = async () => {
    try {
      return await LeadSource.find({});
    } catch (error) {
      console.log(error);
    }
  };



  export const qDeleteLeadSourceById = async (_id: string) => {
    try {
      return await LeadSource.findByIdAndRemove(_id);
    } catch (error) {
      console.log(error);
    }
  };
  

  
  ////==============================================