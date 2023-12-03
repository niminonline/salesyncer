import { publishAndResponse } from "../services/RedisOps";
import service from "../constants/services";
import {
  adminLogin,
  employeeLogin,
  passwordUpdateChannel,
  verifyTokenChannel,
} from "../constants/auth-channels";

export const publishAdminLogin = async (data: object) => {
  return await publishAndResponse(
    service.auth,
    data,
    adminLogin.send,
    adminLogin.listen
  );
};
export const publishEmployeeLogin = async (data: object) => {
  return await publishAndResponse(
    service.auth,
    data,
    employeeLogin.send,
    employeeLogin.listen
  );
};
export const publishPasswordUpdate = async (data: object) => {
  return await publishAndResponse(
    service.auth,
    data,
    passwordUpdateChannel.send,
    passwordUpdateChannel.listen
  );
};
export const verifyToken = async (headers: object) => {
  //publishChannel, publishData, publishAction, subscribeChannel
  return await publishAndResponse(
    service.auth,
    headers,
    verifyTokenChannel.send,
    verifyTokenChannel.listen
  );
};
