import mongoose from "mongoose";

const regionSchema = new mongoose.Schema({
  regionCode: {
    type: String,
    required: true,
  },
  regionName: {
    type: String,
    required: true,
  },
});

const Region = mongoose.model("Region",regionSchema);

export default Region;
