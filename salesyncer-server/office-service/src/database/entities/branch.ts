// import mongoose from "mongoose";

// const branchSchema = new mongoose.Schema({
//   branch: {
//     type: String,
//     required: true,
//   },
//   location: {
//     type: String,
//   },
//   region: {
//     type: String,
//     ref: "region",
//   },
// });

// const Branch = mongoose.model("Branch", branchSchema);

// export default Branch;

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
  region: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Region",
  },
});

const Branch = mongoose.model("Branch",branchSchema);

export default Branch;
