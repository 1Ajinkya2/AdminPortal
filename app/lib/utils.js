import mongoose from "mongoose";
import { Pool } from 'pg';
import * as dotenv from 'dotenv';
const connection = {};

// export const connectToDB = async () => {
//   try {
//     if (connection.isConnected) return;
//     const db = await mongoose.connect("mongodb://localhost:27017/AdminDashboard");
//     connection.isConnected = db.connections[0].readyState;
//     console.log("Connected to database");
//   } catch (error) {
//     console.log(error);
//     throw new Error(error);
//   }
// };

// import { Pool } from 'pg';
// import * as dotenv from 'dotenv';

// // Load environment variables from .env file
dotenv.config();

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
  port: parseInt(process.env.DB_PORT, 10),
});

export const connectToDB = async () => {
  try {
    // Test the connection by running a simple query
    await pool.query('SELECT NOW()');
    console.log('Database connection established');
  } catch (err) {
    console.error('Database connection error:', err);
    throw new Error('Failed to connect to the database');
  }
};

// Export the pool if you need to use it elsewhere
export { pool };
