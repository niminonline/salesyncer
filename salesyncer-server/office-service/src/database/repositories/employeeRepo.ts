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