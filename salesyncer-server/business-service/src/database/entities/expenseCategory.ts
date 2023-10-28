import mongoose from "mongoose";

const expenseCategorySchema = new mongoose.Schema({
  expenseCategory: {
    type: String,
  },
});

const ExpenseCategory = mongoose.model("ExpenseCategory",expenseCategorySchema);

export default ExpenseCategory;