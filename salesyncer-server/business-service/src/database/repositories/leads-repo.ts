import Leads from "../entities/leads";
import LeadSource from "../entities/leadSource";
import Products from "../entities/products";
import BusinessCounter from "../entities/BusinessCounter";
import moment from 'moment';
import logger from "../../services/winston";


////==============================================
export const qGetProductsData = async () => {
  try {
    return await Products.find({});
  } catch (error) {
     logger.error(error);
  }
};

////==============================================
////==============================================
export const qGetLeadsData = async () => {
  try {
    return await Leads.find({}).populate('client').sort({_id:-1});
  } catch (error) {
     logger.error(error);
  }
};

////==============================================

export const qCreateLeadsData = async (newLeadData: object) => {
  try {
    if(newLeadData){

      const newLead = new Leads(newLeadData);
      
      const addLeadToDB=  await newLead.save();
      return addLeadToDB;
    } else {
      logger.info(`Unable to write to db. Data missing`);
    }
  } catch (error) {
     logger.error(error);
  }
};

////==============================================

export const qGetLeadDataById = async (_id: string) => {
  try {
    if(_id){

      return await Leads.findById(_id).populate('client');
    } else {
      logger.info(`Unable to write to db. Data missing`);
    }
  } catch (error) {
     logger.error(error);
  }
};

////==============================================

export const qUpdateLeadDataById = async (
  _id: string,
  newLeadData: any
  ) => {
    try {
      if(_id && newLeadData){

        const updateOperation = {
          $set: newLeadData,
        };
        const response = await Leads.findByIdAndUpdate(_id, updateOperation);
        if(response){
          const currentDate = moment().format('DD/MM/YYYY hh:mm a');
          
          await Leads.findByIdAndUpdate(_id,{$push:{log:`${currentDate}: Lead updated by ${newLeadData.owner}`}})
        }
        return response;
      } else {
        logger.info(`Unable to write to db. Data missing`);
      }
    } catch (error) {}
  };
  
  ////==============================================
  
  
  export const qGetLeadsCount = async () => {
    try {
      const counterData=  await BusinessCounter.findOne(); 
      if(counterData)
      return counterData.leadCounter;
   
    } catch (error) {
       logger.error(error);
    }
  };
  

  
  export const qIncLeadCount = async () => {
    try {
      const updateCounterData=  await BusinessCounter.findOneAndUpdate({$inc:{leadCounter:1}});  
      return updateCounterData;
    } catch (error) {
       logger.error(error);
    }
  };
  
  ////==============================================
  export const qDeleteLeadDataById = async (_id: string) => {
    try {
      if(_id){
      return await Leads.findByIdAndRemove(_id);
    } else {
      logger.info(`Unable to write to db. Data missing`);
    }
    } catch (error) {
       logger.error(error);
    }
  };
  
  ////==============================================
  ////=====================Lead Source=========================
  
  
  export const qCreateLeadSourceData = async (newLeadSourceData: object) => {
    try {
      if(newLeadSourceData){
      const newLeadSource = new LeadSource(newLeadSourceData);
  
      const addLeadSourceToDB = await newLeadSource.save();
      return addLeadSourceToDB;
    } else {
      logger.info(`Unable to write to db. Data missing`);
    }
    } catch (error) {
       logger.error(error);
    }
  };

  
  export const qUpdateLeadSourceDataById = async (
    _id: string,
    newLeadSourceData: any
  ) => {
    try {
      if(_id && newLeadSourceData){
      const updateOperation = {
        $set: newLeadSourceData,
      };
      const response = await LeadSource.findByIdAndUpdate(_id, updateOperation);
  
      return response;
    } else {
      logger.info(`Unable to write to db. Data missing`);
    }
    } catch (error) {}
  };
  
  
  
  export const qGetLeadsSourceData = async () => {
    try {
      return await LeadSource.find({});
    } catch (error) {
       logger.error(error);
    }
  };



  export const qDeleteLeadSourceById = async (_id: string) => {
    try {
      if(_id){

        return await LeadSource.findByIdAndRemove(_id);
      } else {
        logger.info(`Unable to write to db. Data missing`);
      }
    } catch (error) {
       logger.error(error);
    }
  };
  

  
  ////==============================================