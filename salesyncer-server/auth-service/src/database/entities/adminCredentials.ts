import mongoose from "mongoose";

const adminCredentialsSchema = new mongoose.Schema({
   email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  }
});

const AdminCredentials = mongoose.model("AdminCredentials",adminCredentialsSchema);

export default AdminCredentials;