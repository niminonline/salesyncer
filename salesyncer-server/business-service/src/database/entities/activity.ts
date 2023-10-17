import mongoose from "mongoose";

const activitySchema = new mongoose.Schema({
  lead: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Lead",
  },
  contact: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Contact",
  },
  activityType: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "ActivityType",
  },
  date: {
    type: Date,
  },
  empId: {
    type: String,
  },
  employeeName: {
    type: String,
  },
  status: {
    type: String,
  },
  scheduledActivity: {
    type: String,
  },
  scheduledTime: {
    type: Date,
  },
  feedback: {
    type: String,
  },
});

const Activity = mongoose.model("Activity",activitySchema);

export default Activity;