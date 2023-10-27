import { publishAndResponse } from "../services/RedisOps";

export const createContactDetails = async(data:object)=>{

    //publishChannel, publishData, publishAction, subscribeChannel
return await publishAndResponse('business-service', data, 'createContactDetails', 'ApiRes-createContactDetails');
}
export const editContactDetails = async(data:object)=>{

    //publishChannel, publishData, publishAction, subscribeChannel
return await publishAndResponse('business-service', data, 'editContactDetails', 'ApiRes-editContactDetails');
}
export const getContactDetails = async(data:object)=>{
   
    //publishChannel, publishData, publishAction, subscribeChannel
return await publishAndResponse('business-service', data, 'getContactDetails', 'ApiRes-getContactDetails');
}
export const getContactsDetails = async()=>{
    const data={};
    //publishChannel, publishData, publishAction, subscribeChannel
return await publishAndResponse('business-service', data, 'getContactsDetails', 'ApiRes-getContactsDetails');
}