import {
  qEmployeeDataByEmail,
  qEmployeeDataByPhone,
  qUpdateEmployeeDataById,
  qEmployeeDataById,
} from "../database/repositories/employeeRepo";
import { publishAndResponse } from "../services/redisOps";

const updateEmployeeData = async (newEmpData: any) => {
  try {
    console.log("New emp data from updateOfficeUsecase", newEmpData);
    if (newEmpData.email) {
      const { _id, email, phone } = newEmpData;
      const isEmailExists = await qEmployeeDataByEmail(email);
      // console.log("EMAIL EXISTS",isEmailExists);
      // console.log("EMAIL EXISTS",isEmailExists?._id.toString());
      // console.log("EMAIL EXISTS",_id);
      const isPhoneExists = await qEmployeeDataByPhone(phone);

      if (isEmailExists && isEmailExists?._id.toString() !== _id) {
        console.log("EMAIL EXIST");
        return { status: "FAILED", message: "Email already exists" };
      } else if (isPhoneExists && isPhoneExists?._id.toString() !== _id) {
        return { status: "FAILED", message: "Mobile number already exists" };
      } else if (newEmpData) {
        // const{branch,name,email,phone,addressLine1,addressLin2,place,pincode,role,designation}=newEmpData;
        const currentData = await qEmployeeDataById(_id);
        const empId = currentData?.empId;
        const dataToUpdate = {
          name: newEmpData.name,
          branch: newEmpData.branch,
          email: newEmpData.email,
          phone: newEmpData.phone,
          role: newEmpData.role,
          designation: newEmpData.designation,
          'address.addressLine1': newEmpData.addressLine1,
          'address.addressLine2': newEmpData.addressLine2,
          'address.place': newEmpData.place,
          'address.pincode': newEmpData.pincode,
          }
        

        const updateResponse = await qUpdateEmployeeDataById(_id, dataToUpdate);
        if (updateResponse) {
          const data = {
            empId: empId,
            email: email,
          };

          const ack: any = await publishAndResponse(
            "auth-service",
            data,
            "updateAuthEmail",
            "Res-updateAuthEmail"
          );
          if (ack.status == "OK") {
            return { status: "OK", message: "Employee updated successfully" };
          } else {
            return { status: "FAILED", message: "Employee updation Failed" };
          }
        }
      }
    } else {
      const { _id, phone } = newEmpData;
      const isPhoneExists = await qEmployeeDataByPhone(phone);
      if (isPhoneExists && isPhoneExists?._id !== _id) {
        return { status: "FAILED", message: "Mobile number already exists" };
      } else if (newEmpData) {

        const dataToUpdate = {
            name: newEmpData.name,
            branch: newEmpData.branch,
            email: newEmpData.email,
            phone: newEmpData.phone,
            role: newEmpData.role,
            designation: newEmpData.designation,
            'address.addressLine1': newEmpData.addressLine1,
            'address.addressLine2': newEmpData.addressLine2,
            'address.place': newEmpData.place,
            'address.pincode': newEmpData.pincode,
            }


        const updateResponse = await qUpdateEmployeeDataById(_id, dataToUpdate);
        if (updateResponse) {
          return { status: "OK", message: "Employee updated successfully" };
        } else {
          return { status: "FAILED", message: "Employee updation Failed" };
        }
      }
    }
  } catch (err) {
    console.error(err);
  }
};

export default updateEmployeeData;
