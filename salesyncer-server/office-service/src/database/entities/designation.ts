import mongoose from "mongoose";

const designationSchema = new mongoose.Schema({
  designation: {
    type: String,
  },
});

const Designation = mongoose.model("Designation",designationSchema);

export default Designation;