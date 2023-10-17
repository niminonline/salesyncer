import mongoose from "mongoose";

const leadSourceSchema = new mongoose.Schema({
  leadSource: {
    type: String,
  },
});

const LeadSource = mongoose.model("LeadSource",leadSourceSchema);

export default LeadSource;
