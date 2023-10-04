import express, { Request, Response } from "express";
import { config } from "dotenv";
import connectDB from "./config/mongodb";
import { logger } from "./middlewares/winston";
import Region from "./database/entities/region";
import Branch from "./database/entities/branch";
import Admin from "./database/entities/admin";
import Employee from "./database/entities/employee";
import Designation from "./database/entities/designation";
import Role from "./database/entities/role";
import Leave from "./database/entities/leave";
import LeaveCategory from "./database/entities/leaveCategory";
import Documents from "./database/entities/documents";

const app = express();
config();
connectDB();
const port = process.env.PORT ? process.env.PORT : 3002;

app.get("/", async (req: Request, res: Response) => {
  const createFun = async () => {
    const result = new Documents({
      title:"Data",
      type:"Data",
      author:"Data", 
      filepath:"Data",
    });
    result.save();
  };

  createFun();
  res.send("Welcome to office service");
});

app.listen(port, () => {
  console.log(`Office management server listening at port# ${port}`);
});
