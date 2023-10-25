import { ObjectId } from "mongodb";
import mongoose from "mongoose";

const leaveSchema = new mongoose.Schema({
  employeeObj_id: {
    type: ObjectId,
    required: true,
    ref:"Employee"
  },
  startDate: {
    type: Date,
  },
  endDate: {
    type: Date,
  },
  reason: {
    type: String,
    required: true,
  },
  leaveCategory: {
    type: String,
  },
  type: {
    type: String,
  },
  documents: [{ type: String }],
  status: {
    type: String,
    default:"Pending"
  },
  appliedDate:{
    type:Date,
    default: Date.now()
  }
});

const Leave = mongoose.model("Leave", leaveSchema);

export default Leave;
