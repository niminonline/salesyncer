import mongoose from "mongoose";
import logger from "../services/winston";

// ==============MongoDb Atlas=====================

const connectDB = async (): Promise<void> => {
  try {
    const dbUrl: string | undefined = process.env.MONGODB_URL;

    if (dbUrl) {
      mongoose.set("strictQuery", true);

      await mongoose.connect(dbUrl);
       logger.info(`Business database connected successfully`);
    } else {
      logger.error("Error in connecting business database");
    }
  } catch (error) {
    logger.error("Error while connecting db", error);
  }
};

export default connectDB;
