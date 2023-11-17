import express, { Request, Response } from "express";
import { config } from "dotenv";
import connectDB from "./config/mongodb";
import { subscribeToChannel } from "./interfaces/routes/interface";
import logger from './services/winston';

const app = express();
config();
connectDB();
const port = process.env.PORT ? process.env.PORT : 3003;

subscribeToChannel("business-service");

app.listen(port, () => {
  logger.info(`Business management server listening at port# ${port}`)
});
