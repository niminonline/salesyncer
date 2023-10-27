import express, { Request, Response } from "express";
import { config } from "dotenv";
import connectDB from "./config/mongodb";
import { subscribeToChannel } from "./interfaces/routes/interface";

const app = express();
config();
connectDB();
const port = process.env.PORT ? process.env.PORT : 3003;

subscribeToChannel("business-service");

app.listen(port, () => {
  console.log(`Business management server listening at port# ${port}`);
});
