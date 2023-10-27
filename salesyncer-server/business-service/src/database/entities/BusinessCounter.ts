import mongoose from "mongoose";

const businessCounterSchema = new mongoose.Schema({
  contactCounter: {
    type: Number,
    default:1
  },
  leadCounter: {
    type: Number,
    default:1
  },

});

const BusinessCounter = mongoose.model("BusinessCounter", businessCounterSchema);

export default BusinessCounter;
