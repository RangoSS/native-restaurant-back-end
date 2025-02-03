import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/Connection.js";
import routerRestaurant from "./routes/routerResturant.js";

// Initialize dotenv to access environment variables
dotenv.config();

const app = express();

const PORT = process.env.PORT || 3003;

// CORS configuration
const corsOptions = {
  origin: process.env.NODE_ENV === "development"
    ? "http://localhost:8081"  // Allow localhost:8081 during development
    : "*",  // Allow all origins in production (customize this as needed)
};

// Enable CORS for all routes
app.use(cors(corsOptions));

// Middleware to restrict access by IP
app.use((req, res, next) => {
  if (process.env.NODE_ENV === "development") {
    console.log("Development mode: IP restriction disabled");
    return next();
  }

  const clientIP = req.headers["x-forwarded-for"] || req.socket.remoteAddress;
  console.log("Detected IP:", clientIP); // Log the IP for debugging

  // Only allow access from this specific IP
  if (clientIP === "35.160.120.126") {
    next();
  } else {
    res.status(403).json({ error: "Access denied. Your IP is not allowed." });
  }
});

// Use Express built-in middleware for body parsing
app.use(express.urlencoded({ extended: false })); // Parse URL-encoded requests
app.use(express.json()); // Parse JSON requests

// Connect to MongoDB
connectDB();

// Use restaurant routes
app.use("/api", routerRestaurant);

// Start the server
app.listen(PORT, () => {
  console.log(`✅ Server is running on port ${PORT}`);
});
