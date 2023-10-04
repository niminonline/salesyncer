import express, { Request, Response } from "express";
import { config } from "dotenv";
import {
  createProxyMiddleware,
  Filter,
  Options,
  RequestHandler,
} from "http-proxy-middleware";

const app = express();
config();

const port = process.env.PORT ? process.env.PORT : 3001;

const authProxy = createProxyMiddleware("/auth", {
  target: "http://localhost:3001",
  changeOrigin: true,
  pathRewrite: {
    "^/auth": "",
  },
});

const officeProxy = createProxyMiddleware("/office", {
  target: "http://localhost:3002",
  changeOrigin: true,
  pathRewrite: {
    "^/office": "",
  },
});

const businessProxy = createProxyMiddleware("/business", {
  target: "http://localhost:3003",
  changeOrigin: true,
  pathRewrite: {
    "^/business": "",
  },
});

const productsProxy = createProxyMiddleware("/products", {
  target: "http://localhost:3004",
  changeOrigin: true,
  pathRewrite: {
    "^/products": "",
  },
});

const accountsProxy = createProxyMiddleware("/accounts", {
  target: "http://localhost:3005",
  changeOrigin: true,
  pathRewrite: {
    "^/accounts": "",
  },
});

app.use(authProxy);
app.use(officeProxy);
app.use(businessProxy);
app.use(productsProxy);
app.use(accountsProxy);

app.listen(port, () => {
  console.log(`API gateway listening at port# ${port}`);
});
