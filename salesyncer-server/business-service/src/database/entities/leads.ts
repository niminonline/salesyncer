import mongoose from "mongoose";

const leadsSchema = new mongoose.Schema({
  contact: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Contact",
  },
  leadId: {
    type: String,
    required: true,
  },
  employeeName: {
    type: String,
  },
  empId: {
    type: String,
  },
  type: {
    type: String,
  },
  createdBy: {
    type: String,
  },
  createdDate: {
    type: Date,
  },
  status: {
    type: String,
  },
  lastActivity: {
    type: String,
  },
  leadSource: {
    type: String,
  },
  // leadSubsource: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: "LeadSubSource",
  // },
  // documentsSent: [{ type: String }],
  // expectedSales: {
  //   type: Number,
  // },
  notes: {
    type: String,
  },
  products: [
    {
      productId: {
        type: String,
      },
      productName: {
        type: String,
      },
      Quantity: {
        type: Number,
      },
      QuotedPrice: {
        type: Number,
      },
    },
  ],
  log: [
    {
      date: {
        type: Date,
      },
      activityDetails: {
        type: String,
      },
      employeeName: {
        type: String,
      },
    },
  ],
});

const Leads = mongoose.model("Leads",leadsSchema);

export default Leads;
