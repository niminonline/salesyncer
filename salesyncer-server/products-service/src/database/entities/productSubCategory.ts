import mongoose from "mongoose";

const productSubCategorySchema = new mongoose.Schema({
  productSubCategory: {
    type: String,
    required: true,
  },
  productCategory: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "ProductCategory",
  },
});

const ProductSubCategory = mongoose.model("ProductSubCategory",productSubCategorySchema);

export default ProductSubCategory;