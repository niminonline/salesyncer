import mongoose from "mongoose";

const activityTypeSchema = new mongoose.Schema({
  activityType: {
    type: String,
  },
});

const ActivityType = mongoose.model("ActivityType",activityTypeSchema);

export default ActivityType;