
import AdminCredentials from "../entities/adminCredentials";
import EmployeeCredentials from "../entities/employeeCredentials";



export const qAdminData = async (email: string) => {
    return await AdminCredentials.findOne({ email: email });
  };



export const qFindEmpByEmail = async (
    email: string
  ) => {
    const userData = await EmployeeCredentials.findOne({ email: email });
    return userData;
  };