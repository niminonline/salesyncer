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

//==========================================Leads========================================================
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



//==========================================Activity========================================================
export const createActivityDetails = async(data:object)=>{

    //publishChannel, publishData, publishAction, subscribeChannel
return await publishAndResponse('business-service', data, 'createActivityDetails', 'ApiRes-createActivityDetails');
}
export const editActivityDetails = async(data:object)=>{

    //publishChannel, publishData, publishAction, subscribeChannel
return await publishAndResponse('business-service', data, 'editActivityDetails', 'ApiRes-editActivityDetails');
}
export const getActivityDetails = async(data:object)=>{
   
    //publishChannel, publishData, publishAction, subscribeChannel
return await publishAndResponse('business-service', data, 'getActivityDetails', 'ApiRes-getActivityDetails');
}
export const getActivitiesDetails = async()=>{
    const data={};
    //publishChannel, publishData, publishAction, subscribeChannel
    return await publishAndResponse('business-service', data, 'getActivitiesDetails', 'ApiRes-getActivitiesDetails');
}
export const deleteActivityDetails = async(data:object)=>{
   
    //publishChannel, publishData, publishAction, subscribeChannel
return await publishAndResponse('business-service', data, 'deleteActivityDetails', 'ApiRes-deleteActivityDetails');
}
//=================================================================================================================



