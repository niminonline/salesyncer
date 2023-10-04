import express, { Request, Response } from "express";
import { config } from "dotenv";

const app = express();
config();

const port = process.env.PORT ? process.env.PORT : 3001;

app.get("/", async (req: Request, res: Response) => {

  res.send("Welcome to Auth service");
});

app.listen(port, () => {
  console.log(`Authentication server listening at port# ${port}`);
});
