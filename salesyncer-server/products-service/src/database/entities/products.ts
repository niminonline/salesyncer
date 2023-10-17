import mongoose from "mongoose";

const productsSchema = new mongoose.Schema({
  productId: {
    type: String,
    required: true,
  },
  productName: {
    type: String,
    required: true,
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "ProductCategory",
  },
  subcategory: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "ProductSubCategory",
  },
  status: {
    type: String,
    required: true,
  },
  mrp: {
    type: Number,
  },
  lsp: {
    type: Number,
  },
});

const Products = mongoose.model("Products",productsSchema);

export default Products;