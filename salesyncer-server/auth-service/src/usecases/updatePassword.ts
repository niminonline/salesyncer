import { matchPassword } from "../services/bcrypt";
import { qFindEmpByEmail,qUpdatePassword } from "../database/repositories/authRepo";
import { securePassword } from "../services/bcrypt";
import logger from "../services/winston";

const updatePassword = async (
  email: string,
  currentPassword: string,
  newPassword: string,
): Promise<object | undefined> => {
  try {

    const empData = await qFindEmpByEmail(email);
    if (empData) {
        const validatePassword = await matchPassword(currentPassword, empData.password);
        if (validatePassword) {

            const sPassword:any= await securePassword(newPassword);

            const response= await qUpdatePassword(email,sPassword);
            console.log(response)
            if(response){
                return { status: "OK", message: "Password updated Successfully", };
            }
            else{
                return { status: "FAILED", message: "Password updation failed", };
            }

        }
        else{
            return { status: "FAILED", message: "Old password is incorrect", };
        }

      

    }
    else{
        return { status: "FAILED", message: "User data doesn't exist", };
    }

  } catch (err) {
    logger.error(err);
  }
};


export default updatePassword;