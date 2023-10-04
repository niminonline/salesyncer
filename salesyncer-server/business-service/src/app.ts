import express, { Request, Response } from "express";
import { config } from "dotenv";
import connectDB from "./config/mongodb";
import { logger } from "./middlewares/winston";
import Contacts from "./database/entities/contacts";
import LinkType from "./database/entities/linkType";
import Activity from "./database/entities/activity";
import ActivityType from "./database/entities/activityType";
import Leads from "./database/entities/leads";
import LeadSource from "./database/entities/leadSource";
import LeadSubSource from "./database/entities/leadSubSource";

const app = express();
config();
connectDB();
const port = process.env.PORT ? process.env.PORT : 3003;

app.get("/", async (req: Request, res: Response) => {
  // const createFun = async () => {
  //   const result = new LeadSubSource({
  //     leadSubsource:"Data"
  //   });
  //   result.save();
  // };

  // createFun();
  res.send("Welcome to business service");
});

app.listen(port, () => {
  console.log(`Business management server listening at port# ${port}`);
});
