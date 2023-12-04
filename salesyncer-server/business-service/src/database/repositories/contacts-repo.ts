import Contacts from "../entities/contacts";
import BusinessCounter from "../entities/BusinessCounter";
import logger from "../../services/winston";

////==============================================
export const qGetContactsData = async () => {
  try {
    return await Contacts.find({});
  } catch (error) {
    logger.error(error);
  }
};

////==============================================

export const qCreateContactData = async (newContactData: object) => {
  try {

    if(newContactData){

      const newContact = new Contacts(newContactData);
     
     const addContactToDB=  await newContact.save();
     return addContactToDB;
    } else {
      logger.info(`Unable to write to db. Data missing`);
    }
  } catch (error) {
    logger.error(error);
  }
};

////==============================================

export const qGetContactsDataById = async (_id: string) => {
  try {
    if(_id){

      return await Contacts.findById(_id);
    } else {
      logger.info(`Unable to write to db. Data missing`);
    }
  } catch (error) {
     logger.error(error);
  }
};

////==============================================

export const qUpdateContactsDataById = async (
  _id: string,
  newContactData: object
  ) => {
    try {
      if(_id && newContactData){

        const updateOperation = {
          $set: newContactData,
        };
        const response = await Contacts.findByIdAndUpdate(_id, updateOperation);
        return response;
      } else {
        logger.info(`Unable to write to db. Data missing`);
      }
    } catch (error) {}
  };
  
  ////==============================================
  
  
  export const qGetContactCount = async () => {
    try {
      const counterData=  await BusinessCounter.findOne(); 
      if(counterData)
      return counterData.contactCounter;
    
    } catch (error) {
       logger.error(error);
    }
  };
  
  ////==============================================
  ////==============================================
  
  
  export const qIncContactCount = async () => {
    try {
      const updateCounterData=  await BusinessCounter.findOneAndUpdate({$inc:{contactCounter:1}});  
      
      return updateCounterData;
    } catch (error) {
       logger.error(error);
    }
  };
  
  ////==============================================
  export const qDeleteContactDataById = async (_id: string) => {
    try {
      if(_id){

        return await Contacts.findByIdAndRemove(_id);
      } else {
        logger.info(`Unable to write to db. Data missing`);
      }
    } catch (error) {
       logger.error(error);
    }
  };
  
  ////==============================================