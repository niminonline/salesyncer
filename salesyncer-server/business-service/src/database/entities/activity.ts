import mongoose from "mongoose";

const activitySchema = new mongoose.Schema(
  {
    lead: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Leads",
    },
    // contact: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   ref: "Contact",
    // },
    activityId: {
      type: String,
    },
    type: {
      type: String,
    },
    empId: {
      type: String,
    },
    owner: {
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
  },
  { timestamps: true }
);

const Activity = mongoose.model("Activity", activitySchema);

export default Activity;
