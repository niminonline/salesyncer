import express from "express";
import { config } from "dotenv";
import router from "./interfaces/routers/router";
import cors from "cors";
import logger from "./services/winston";

const port = process.env.PORT || 3000;

const app = express();
// app.use(cors({origin: "http://salesyncer.cloud"}));
config();




const allowedOrigins = [
  "http://localhost:4200",
  "localhost:4200",
  "http://localhost:80",
  "localhost:80",
  "http://localhost",
  "localhost",
  "http://13.233.80.164",
  "www.salesyncer.cloud",
  "salesyncer.cloud",
  "*.salesyncer.cloud",
  "http://www.salesyncer.cloud",
  "http://salesyncer.cloud",
  "https://salesyncer.cloud",
   "https://www.salesyncer.cloud"
 

];

const corsOptions = {
  origin: function (origin: any, callback: any) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
  methods: "GET, POST, PUT, PATCH, DELETE",
};

app.use(cors(corsOptions));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/", router);

app.listen(port, () => {
  logger.info(`API gateway listening at port# ${port}`);
});
