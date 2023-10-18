import { publishAndResponse } from "../services/RedisOps";

export const publishAdminLogin = async(data:object)=>{

    return await publishAndResponse('auth-service', data, 'adminLogin', 'ApiRes-adminLogin');
}
export const publishEmployeeLogin = async(data:object)=>{

                                //publishChannel, publishData, publishAction, subscribeChannel
    return await publishAndResponse('auth-service', data, 'employeeLogin', 'ApiRes-employeeLogin');
}
export const verifyToken = async(headers:object)=>{

                                //publishChannel, publishData, publishAction, subscribeChannel
    return await publishAndResponse('auth-service', headers, 'verifyToken', 'ApiRes-verifyToken');
}





