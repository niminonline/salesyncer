import { publishAndResponse } from "../services/RedisOps";

export const verifyAdminLogin = async(data:object)=>{

    return await publishAndResponse('auth-service', data, 'verify_credentials', 'auth-response');
}