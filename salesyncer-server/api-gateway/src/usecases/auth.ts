import { publishAndResponse } from "../services/RedisOps";

export const verifyAdminLogin = async(data:object)=>{

    return await publishAndResponse('auth-service', data, 'adminLogin', 'auth-response');
}
export const verifyEmployeeLogin = async(data:object)=>{

    return await publishAndResponse('auth-service', data, 'employeeLogin', 'auth-response');
}


