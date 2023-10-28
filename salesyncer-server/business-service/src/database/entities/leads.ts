import mongoose from "mongoose";

const leadsSchema = new mongoose.Schema(
  {
    branch: {
      type: String,
    },
    client: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Contact",
    },
    leadId: {
      type: String,
      required: true,
    },
    type: {
      type: String,
    },
    source: {
      type: String,
    },
    owner: {
      type: String,
    },
    productCategory: {
      type: String,
    },
    product: {
      type: String,
    },
    quotedPrice: {
      type: Number,
    },
    status: {
      type: String,
    },
    lastActivity: {
      type: String,
    },
    notes: {
      type: String,
    },
    log: [
      {
        type: String,
      },
    ],
    // empId: {
    //   type: String,
    // },
    // createdBy: {
    //   type: String,
    // },
    // createdDate: {
    //   type: Date,
    //   default: Date.now()
    // },
    // leadSubsource: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   ref: "LeadSubSource",
    // },
    // documentsSent: [{ type: String }],
    // expectedSales: {
    //   type: Number,
    // },
    // products: [
    //   {
    // productId: {
    //   type: String,
    // },
    // Quantity: {
    //   type: Number,
    // },
    //   },
    // ],
  },
  { timestamps: true }
);

const Leads = mongoose.model("Leads", leadsSchema);

export default Leads;
