import express from "express";
import { config } from "dotenv";
import { subscribeToChannel } from "./interfaces/routes/interface";
import connectDB from "./config/mongodb";

const app = express();
config();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
connectDB();
const port = process.env.PORT || 3001;


subscribeToChannel("auth-service");



app.listen(port, () => {
  console.log(`Authentication server listening at port# ${port}`);
});
