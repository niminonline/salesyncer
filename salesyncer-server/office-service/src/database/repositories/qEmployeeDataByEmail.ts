import Employee from "../entities/employee";



export const qEmployeeDataByEmail = async (email: string) => {
  console.log("Input email to qEmployeeDataByEmail ",email)
      return await Employee.findOne({email:email});
  };



