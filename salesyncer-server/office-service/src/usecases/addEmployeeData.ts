import {
  qEmployeeDataByEmail,
  qAddEmployeeData,
} from "../database/repositories/employeeRepo";
import { publishAndResponse } from "../services/redisOps";

const addEmployeeData = async (employeeData: any) => {
  try {
    if (employeeData) {
      const branchCode = "BR001";

      const newEmployee = {
        empId: employeeData.empId,
        name: employeeData.name,
        dob: employeeData.dob,
        email: employeeData.email,
        password: employeeData.password,
        phone: employeeData.phone,
        joinedDate: employeeData.joinedDate,
        branchCode,
      };

      const response = await qAddEmployeeData(newEmployee);
      console.log("Response from add employee Q", response);

      if (response) {
        const data = {
          empId: employeeData.empId,
          email: employeeData.email,
          password: employeeData.password,
        };
        const ack: any = await publishAndResponse(
          "auth-service",
          data,
          "addEmployeeToAuthDb",
          "Res-addEmployeeToAuthDb"
        );
        if (ack.status == "OK") {
          return { status: "OK", message: "Employee added successfully" };
        } else {
          return { status: "FAILED", message: "Employee creation Failed" };
        }
      }
    }
  } catch (err) {
    console.error(err);
  }
};

export default addEmployeeData;
