import Employee from "../entities/employee";

export const qEmployeeDataByEmail = async (email: string) => {
  console.log("Input email to qEmployeeDataByEmail ", email);
  return await Employee.findOne({ email: email });
};
export const qAddEmployeeData = async (employeeData: object) => {
  const newEmployee = new Employee(employeeData);
  const response = await newEmployee.save();
  return response;
};
