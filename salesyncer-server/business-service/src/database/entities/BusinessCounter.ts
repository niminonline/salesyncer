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
  activityCounter: {
    type: Number,
    default:1
  },
  saleCounter: {
    type: Number,
    default:1
  },
  productCounter: {
    type: Number,
    default:1
  },

});

const BusinessCounter = mongoose.model("BusinessCounter", businessCounterSchema);

export default BusinessCounter;
