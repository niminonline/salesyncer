

import mongoose from "mongoose";

const branchSchema = new mongoose.Schema({
  branchCode: {
    type: String,
    required: true,
  },
  branchName: {
    type: String,
    required: true,
  },
  location: {
    type: String,
  },
  empCount: {
    type: Number,
    default:1
  },
  // region: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: "Region",
  // },
});

const Branch = mongoose.model("Branch",branchSchema);

export default Branch;
