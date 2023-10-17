import mongoose from "mongoose";

const leadSubSourceSchema = new mongoose.Schema({
  leadSubsource: {
    type: String,
  },
  leadSource: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "LeadSource",
  },
});

const LeadSubSource = mongoose.model("LeadSubSource",leadSubSourceSchema);

export default LeadSubSource;