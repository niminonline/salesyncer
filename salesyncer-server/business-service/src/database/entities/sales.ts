import mongoose from "mongoose";

const saleSchema = new mongoose.Schema({
  date: {
    type: Date,
  },
  invoiceNumber: {
    type: String,
  },
  saleId: {
    type: String,
  },
  lead: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Leads",
  },
  // branchCode: {
  //   type: String,
  // },
  branchName: {
    type: String,
  },
  // empId: {
  //   type: String,
  // },
  employeeName: {
    type: String,
  },
  // subTotal: {
  //   type: Number,
  // },
  // discount: {
  //   type: Number,
  // },
  amount: {
    type: Number,
  },
  // products: [
  //   {
  // productId: {
  //   type: String,
  // },
  productName: {
    type: String,
  },
  productCategory: {
    type: String,
  },
  // ProductSubCategory: {
  //   type: String,
  // },
  quantity: {
    type: Number,
  },
  price: {
    type: Number,
  },
  // },
  // ],
});

const Sale = mongoose.model("Sale", saleSchema);

export default Sale;
