import Employee from "../entities/employee";

export const qEmployeeDataByEmail = async (email: string) => {
  return await Employee.findOne({email});
};
export const qEmployeeDataById = async (_id: string) => {
  return await Employee.findById(_id);
};
export const qEmployeeDataByPhone = async (phone: string) => {
  return await Employee.findOne({phone });
};
export const qAddEmployeeData = async (employeeData: object) => {
  const newEmployee = new Employee(employeeData);
  const response = await newEmployee.save();
  return response;
};

export const qEmployeesData = async () => {
  return await Employee.find({}).select('-password').populate('branch');
};


export const qUpdateEmployeeDataById = async (_id:string,newEmpData: object) => {

  try{
    const updateOperation = {
      $set: newEmpData
    }
    // console.log("Update ops", updateOperation)
    const response = await Employee.findByIdAndUpdate(_id,updateOperation)
    console.log("Update ops response", response)
    return response;
    
  
 }catch(error){

  }

};