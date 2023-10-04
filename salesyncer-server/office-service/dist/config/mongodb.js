"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
// ==============MongoDb Atlas=====================
const connectDB = async () => {
    try {
        const dbUrl = process.env.MONGODB_URL;
        if (dbUrl) {
            mongoose_1.default.set("strictQuery", true);
            await mongoose_1.default.connect(dbUrl);
            console.log("Office database connected successfully");
        }
        else {
            console.error("Error in connecting Office database");
        }
    }
    catch (error) {
        console.error("Error while connecting db", error);
    }
};
exports.default = connectDB;
