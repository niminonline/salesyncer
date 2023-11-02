import {
  qEmployeeDataByEmail,
  qEmployeeDataByPhone,
  qAddEmployeeData,
} from "../database/repositories/employeeRepo";
import { qGetBranchDataByName,qUpdateEmpCount } from "../database/repositories/officeRepo";
import { publishAndResponse } from "../services/redisOps";
import { sendPassword,generateRandomPassword } from "../services/nodemailer";

const addEmployeeData = async (employeeData: any) => {
  try {
    const{email}=employeeData;
    const phone=employeeData.mobile;


    const isEmailExists = await qEmployeeDataByEmail(email);
    const isPhoneExists = await qEmployeeDataByPhone(phone);

    if(isEmailExists){
      return { status: "FAILED", message: "Email already exists" };
    }
    else if(isPhoneExists){
      return { status: "FAILED", message: "Mobile number already exists" };
    }
    else if (employeeData) {
      
      const getBranchDetails:any= await  qGetBranchDataByName(employeeData.selectedBranch);
      const employeeId=  getBranchDetails.branchCode+'00' +getBranchDetails.empCount;
      const branch= employeeData.selectedBranch;

      if(getBranchDetails && employeeId){
        console.log("Branch details----",getBranchDetails);

      const newEmployee = {
        empId: employeeId,
        branch:employeeData.selectedBranch,
        name: employeeData.name,
        email: employeeData.email,
        phone: phone,
        address:{
          addressLine1:employeeData.addressLine1,
          addressLine2:employeeData.addressLine2,
          place:employeeData.place,
         pincode:employeeData.pincode,
        },
        role:employeeData.role,
        designation:employeeData.designation
        
      };
      // console.log("New employee",newEmployee)
      const response = await qAddEmployeeData(newEmployee);
      // console.log("Response from add employee Q", response);

      if (response) {
        const updateEmpcount= await qUpdateEmpCount(branch);
        
        const password= generateRandomPassword(8);
        console.log("Generated password",password);
        sendPassword(email,password);

        const data = {
          empId: employeeId,
          email: email,
          password: password,
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
    else{
      return { status: "FAILED", message: "Employee creation Failed due to branch error" };
    }
    }
  } catch (err) {
    console.error(err);
  }
};

export default addEmployeeData;
