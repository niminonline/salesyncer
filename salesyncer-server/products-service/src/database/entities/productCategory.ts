import mongoose from "mongoose";

const productCategorySchema = new mongoose.Schema({
  productCategory: {
    type: String,
    required: true,
  },
});

const ProductCategory = mongoose.model("ProductCategory",productCategorySchema);

export default ProductCategory;