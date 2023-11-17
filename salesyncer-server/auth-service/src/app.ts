import express from "express";
import { config } from "dotenv";
import { subscribeToChannel } from "./interfaces/routes/interface";
import connectDB from "./config/mongodb";
import logger from "./services/winston";

const app = express();
config();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
connectDB();
const port = process.env.PORT || 3001;


subscribeToChannel("auth-service");



app.listen(port, () => {
  logger.info(`Authentication server listening at port# ${port}`);
});
