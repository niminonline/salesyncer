import express, { Request, Response } from "express";
import { config } from "dotenv";

const app = express();
config();

const port = process.env.PORT ? process.env.PORT : 3001;

app.get("/", async (req: Request, res: Response) => {

  res.send("Welcome to API service");
});

app.listen(port, () => {
  console.log(`API gateway listening at port# ${port}`);
});
