// Mongodb Connection
import mongoose from "mongoose";
import dotenv from "dotenv";
import { error } from "console";

dotenv.config();

const MONGO_URI = process.env.MONGO_URI;

if (!MONGO_URI) {
  throw new Error("MONGO_URI is not defined in envronment variables.");
}
export const connectDB = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("Database connectes succesfully");
  } catch (erorr) {
    console.error("Database connection failed", error);
    process.exit(1);
  }
};
