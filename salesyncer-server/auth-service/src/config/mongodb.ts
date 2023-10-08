import mongoose from "mongoose";

// ==============MongoDb Atlas=====================

const connectDB = async (): Promise<void> => {
  try {
    const dbUrl: string | undefined = process.env.MONGODB_URL;

    if (dbUrl) {
      mongoose.set("strictQuery", true);

      await mongoose.connect(dbUrl);
      console.log("Auth database connected successfully");
    } else {
      console.error("Error in connecting auth database");
    }
  } catch (error) {
    console.error("Error while connecting db", error);
  }
};

export default connectDB;
