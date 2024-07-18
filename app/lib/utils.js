import mongoose from "mongoose";
import { User } from "./models";
import { Product } from "./models";

const connection = {};

export const connectToDB = async () => {
  try {
    if (connection.isConnected) return;
    const db = await mongoose.connect("mongodb://localhost:27017/AdminDashboard");
    await User.init();
    await Product.init();
    connection.isConnected = db.connections[0].readyState;
    console.log("Connected to database");
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};
