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
//  return await  Employee.find().select('empId name branch email phone role designation isRemoved isBlocked leave target attendance address');
  return await Employee.find().select('-password');
};


export const qUpdateEmployeeDataById = async (_id:string,newEmpData: object) => {

  try{
    console.log("Emp id and data from update repo",_id,newEmpData);
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