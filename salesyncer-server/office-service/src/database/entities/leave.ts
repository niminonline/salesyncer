import mongoose from "mongoose";

const leaveSchema = new mongoose.Schema({
  empId: {
    type: String,
    required: true,
  },
  date: [{ type: Date, required: true }],
  reason: {
    type: String,
    required: true,
  },
  leaveCategory: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "LeaveCategory",
  },
  type: {
    type: String,
    required: true,
  },
  documents: [{ type: String }],
  status: {
    type: String,
  },
});

const Leave = mongoose.model("Leave",leaveSchema);

export default Leave;