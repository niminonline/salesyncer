
import AdminCredentials from "../entities/adminCredentials";
import EmployeeCredentials from "../entities/employeeCredentials";



export const qAdminData = async (email: string) => {
    return await AdminCredentials.findOne({ email: email });
  };



export const qFindEmpByEmail = async ( email: string ) => {
    const userData = await EmployeeCredentials.findOne({ email: email });
    console.log("find email",userData)
    return userData;
  };
export const qAddEmployeeCredentials = async (
  empId: string,
  email: string,
  password: string
  ) => {
    const data={empId,email,password};
    const newEmpCredentials= new EmployeeCredentials(data);
    const response= newEmpCredentials.save();
    return response;
  };