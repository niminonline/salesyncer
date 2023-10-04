import mongoose from "mongoose";

const expenseSchema = new mongoose.Schema({
  empId: {
    type: String,
  },
  employeeName: {
    type: String,
  },
  date: {
    type: Date,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  expenseCategory: {
   type: mongoose.Schema.Types.ObjectId,
    ref: "ExpenseCategory",
  },
  description: {
    type: String,
  },
  branchCode: {
    type: String,
  },
  branchName: {
    type: String,
  },
});

const Expense = mongoose.model("Expense",expenseSchema);

export default Expense;