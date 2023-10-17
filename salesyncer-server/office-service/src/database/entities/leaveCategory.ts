import mongoose from "mongoose";

const leaveCategorySchema = new mongoose.Schema({
  category: {
    type: String,
  },
});

const LeaveCategory = mongoose.model("LeaveCategory",leaveCategorySchema);

export default LeaveCategory;