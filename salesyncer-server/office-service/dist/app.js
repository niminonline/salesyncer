"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = require("dotenv");
const mongodb_1 = __importDefault(require("./config/mongodb"));
const winston_1 = require("./middlewares/winston");
(0, dotenv_1.config)();
(0, mongodb_1.default)();
const port = process.env.PORT ? process.env.PORT : 3003;
winston_1.logger.info("Hello, Winston!");
const app = (0, express_1.default)();
const x = "ABSDEF";
app.get("/", (req, res) => {
    res.send("Welcome to the new world");
});
app.listen(port, () => {
    console.log(`Office management server started on port ${port}`);
});
console.log(x);
