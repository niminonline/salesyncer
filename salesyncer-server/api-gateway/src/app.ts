import express from "express";
import { config } from "dotenv";
import router from "./interfaces/routers/router";


const app = express();
config();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const port = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/",router);

app.listen(port, () => {
  console.log(`API gateway listening at port# ${port}`);
});
