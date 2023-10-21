import express from "express";
import { config } from "dotenv";
import router from "./interfaces/routers/router";
import cors from "cors"

const port = process.env.PORT || 3000;

const app = express();
config();


const allowedOrigins = ['http://localhost:4200', 'localhost:4200'];


const corsOptions = {
  origin: function (origin:any, callback:any) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true, 
  methods: 'GET, POST, PUT, PATCH, DELETE', 
};


app.use(cors(corsOptions));


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/",router);

app.listen(port, () => {
  console.log(`API gateway listening at port# ${port}`);
});
