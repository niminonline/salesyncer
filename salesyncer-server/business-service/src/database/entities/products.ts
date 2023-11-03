import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  productId: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  category: {
    type: String,
  },
  // subcategory: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: "ProductSubCategory",
  // },
  status: {
    type: String,
  },
  mrp: {
    type: Number,
  },
  lsp: {
    type: Number,
  },
});

const Product = mongoose.model("Products",productSchema);

export default Product;