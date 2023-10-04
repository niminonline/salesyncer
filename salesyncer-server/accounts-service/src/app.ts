import express, { Request, Response } from "express";
import { config } from "dotenv";
import connectDB from "./config/mongodb";
import { logger } from "./middlewares/winston";
import Sales from "./database/entities/sales";
import Expense from "./database/entities/expense";
import ExpenseCategory from "./database/entities/expenseCategory";

const app = express();
config();
connectDB();
const port = process.env.PORT ? process.env.PORT : 3005;

app.get("/", async (req: Request, res: Response) => {
  const createFun = async () => {
    const result = new ExpenseCategory({
      expenseCategory:"Data",
    });
    result.save();
  };

  createFun();
  res.send("Welcome to Accounts service");
});

app.listen(port, () => {
  console.log(`Accounts management server listening at port# ${port}`);
});
