import mongoose from "mongoose";

const salesSchema = new mongoose.Schema({
  date: {
    type: Date,
  },
  invoiceNumber: {
    type: String,
  },
  leadId: {
    type: String,
    required: true,
  },
  contactId: {
    type: String,
    required: true,
  },
  branchCode: {
    type: String,
  },
  branchName: {
    type: String,
  },
  contactName: {
    type: String,
  },
  empId: {
    type: String,
  },
  employeeName: {
    type: String,
  },
  subTotal: {
    type: Number,
  },
  discount: {
    type: Number,
  },
  totalAmount: {
    type: Number,
  },
  products: [
    {
      productId: {
        type: String,
      },
      productName: {
        type: String,
      },
      ProductCategory: {
        type: String,
      },
      ProductSubCategory: {
        type: String,
      },
      quantity: {
        type: Number,
      },
      price: {
        type: Number,
      },
    },
  ],
});

const Sales = mongoose.model("Sales", salesSchema);

export default Sales;
