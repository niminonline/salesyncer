import express, { Request, Response } from "express";
import { config } from "dotenv";
import connectDB from "./config/mongodb";
import { subscribeToChannel } from "./interfaces/routes/interface";
import logger from "./services/winston";

const app = express();
config();
connectDB();
const port = process.env.PORT ? process.env.PORT : 3002;

subscribeToChannel("office-service");
app.listen(port, () => {
  logger.info(`Office management server listening at port# ${port}`);
});
