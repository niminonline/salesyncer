import { publishAndResponse } from "../services/RedisOps";



export const getLeadSourceDetails = async()=>{
    const data={};
    //publishChannel, publishData, publishAction, subscribeChannel
    return await publishAndResponse('business-service', data, 'getLeadSourceDetails', 'ApiRes-getLeadSourceDetails');
}

export const getProductCategoryDetails = async()=>{
    const data={};
    //publishChannel, publishData, publishAction, subscribeChannel
    return await publishAndResponse('business-service', data, 'getProductCategoryDetails', 'ApiRes-getProductCategoryDetails');
}

export const getProductsDetails = async()=>{
    const data={};
    //publishChannel, publishData, publishAction, subscribeChannel
    return await publishAndResponse('business-service', data, 'getProductsDetails', 'ApiRes-getProductsDetails');
}


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
export const deleteContactDetails = async(data:object)=>{
   
    //publishChannel, publishData, publishAction, subscribeChannel
return await publishAndResponse('business-service', data, 'deleteContactDetails', 'ApiRes-deleteContactDetails');
}
export const createLeadDetails = async(data:object)=>{

    //publishChannel, publishData, publishAction, subscribeChannel
return await publishAndResponse('business-service', data, 'createLeadDetails', 'ApiRes-createLeadDetails');
}
export const editLeadDetails = async(data:object)=>{

    //publishChannel, publishData, publishAction, subscribeChannel
return await publishAndResponse('business-service', data, 'editLeadDetails', 'ApiRes-editLeadDetails');
}
export const getLeadDetails = async(data:object)=>{
   
    //publishChannel, publishData, publishAction, subscribeChannel
return await publishAndResponse('business-service', data, 'getLeadDetails', 'ApiRes-getLeadDetails');
}
export const getLeadsDetails = async()=>{
    const data={};
    //publishChannel, publishData, publishAction, subscribeChannel
    return await publishAndResponse('business-service', data, 'getLeadsDetails', 'ApiRes-getLeadsDetails');
}
export const deleteLeadDetails = async(data:object)=>{
   
    //publishChannel, publishData, publishAction, subscribeChannel
return await publishAndResponse('business-service', data, 'deleteLeadDetails', 'ApiRes-deleteLeadDetails');
}