import express, { Request, Response } from "express";
import { config } from "dotenv";
import connectDB from "./config/mongodb";
import { logger } from "./middlewares/winston";
import Products from "./database/entities/products";
import ProductSubCategory from "./database/entities/productSubCategory";
import ProductCategory from "./database/entities/productCategory";


const app = express();
config();
connectDB();
const port = process.env.PORT ? process.env.PORT : 3004;

app.get("/", async (req: Request, res: Response) => {
  const createFun = async () => {
    const result = new ProductCategory({
      productCategory:"Data"

    });
    result.save();
  };

  createFun();

  res.send("Welcome to Products service");
});

app.listen(port, () => {
  console.log(`Products management server listening at port# ${port}`);
});
