import { qUpdateAuthEmail } from "../database/repositories/authRepo";

const updateAuthEmailID = async (
  empId: string,
  email: string,
): Promise<object | undefined> => {
  try {



    if (empId && email ) {
      const response = await qUpdateAuthEmail(empId, email);
      console.log("Respomse from update auth email id ",response)
      if(response)
      return response;
    } else {
      return { message: "Missing credentials", status: "FAILED" };
    }
  } catch (err) {
    console.error(err);
  }
};


export default updateAuthEmailID;