import mongoose from "mongoose";

const employeeCredentialsSchema = new mongoose.Schema({
empId: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  }
});

const EmployeeCredentials = mongoose.model("EmployeeCredentials",employeeCredentialsSchema);

export default EmployeeCredentials;