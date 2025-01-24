import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";  // <-- Import mongoose
import connectDB from "./config/Connection.js"
import routerRestaurant from "./routes/routerResturant.js"
import { initGridFSBucket } from './middleware/gridfs.js'; 
// Initialize dotenv to access environment variables
dotenv.config();

const app = express();
app.use(cors());  // Enable CORS for all routes

// Use Express built-in middleware for body parsing
app.use(express.urlencoded({ extended: false }));  // Middleware to parse incoming requests with url-encoded payloads
app.use(express.json());  // Middleware to parse incoming JSON requests

const PORT = process.env.PORT || 3003;

// MongoDB connection using Mongoose




// Initialize GridFS bucket when the MongoDB connection is open
//mongoose.connection.once('open', () => {
  //  console.log('MongoDB connected');
    //initGridFSBucket(mongoose.connection);  // Initialize GridFS bucket after connection
  //});
// Use user routes for the API (Uncomment this once you have your routes ready)
 app.use("/api", routerRestaurant);

// Start the server
app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
    
    //initialising db
connectDB();
});
