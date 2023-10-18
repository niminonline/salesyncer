import { qEmployeeDataByEmail,qAddEmployeeData } from "../database/repositories/employeeRepo";

const addEmployeeData = async (
  employeeData: any
) => {
  try {
    if (employeeData) {
      const branchCode = "BR001";

      const newEmployee= {empId:employeeData.empId,
        name:employeeData.name,
        dob:employeeData.dob,
        email:employeeData.email,
        password:employeeData.password,
        phone:employeeData.phone,
        joinedDate:employeeData.joinedDate,branchCode}

        const response= await qAddEmployeeData(newEmployee);
        console.log("Response from add employee Q",response)
        return response;

    }
  } catch (err) {
    console.error(err);
  }
}

export default addEmployeeData;
