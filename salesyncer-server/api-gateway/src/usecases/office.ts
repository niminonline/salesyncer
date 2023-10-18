import { publishAndResponse } from "../services/RedisOps";


export const getEmployeeData = async(data:object)=>{

    return await publishAndResponse('office-service', data, 'getEmployeeData', 'ApiRes-getEmployeeData');
}
export const addEmployeeData = async(data:object)=>{

    return await publishAndResponse('office-service', data, 'addEmployeeData', 'ApiRes-addEmployeeData');
}