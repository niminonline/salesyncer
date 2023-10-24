import { matchPassword } from "../services/bcrypt";
import { qFindEmpByEmail } from "../database/repositories/authRepo";
import { generateEmployeeToken } from "../middlewares/jwt";
import { publishAndResponse } from "../services/redisOps";
publishAndResponse



const verifyEmployeeLogin = async (email: string, password: string) => {
  console.log("Check password",password)
  const empData = await qFindEmpByEmail(email);
  if (empData) {


    const validatePassword = await matchPassword(password, empData.password);
    if (validatePassword) {
      const token =  generateEmployeeToken(empData);
      if(token){
        
        const get_id: any = await publishAndResponse(
          "office-service",
          {email},
          "getEmployeeDataWithEmail",
          "Res-getEmployeeDataWithEmail"
        );
        if (get_id.status == "OK") {
          return {token,_id:get_id._id,message: "User credentials verified successfully", status: "OK" };

          
        } else {
          return { status: "FAILED", message: "Failed fetching user information" };
        }


      }
      else{
        return { message: "Token generation failed", status: "FAILED" };
      }
    } else {
      return { message: "Invalid credentials", status: "FAILED" };
    }
  } else {
    return { message: "User not found", status: "FAILED" };
  }
};

export default verifyEmployeeLogin;