import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/Connection.js";
import routerRestaurant from "./routes/routerResturant.js";

// Initialize dotenv to access environment variables
dotenv.config();

const app = express();

// Define allowed IPs, including local IPs for development
const allowedIPs = [
  "127.0.0.1", // IPv4 localhost
  "::1",       // IPv6 localhost
  "35.160.120.126",
  "44.233.151.27",
  "34.211.200.85"
];

// Middleware to restrict access by IP
app.use((req, res, next) => {
  if (process.env.NODE_ENV === "development") {
    // Allow all requests in development mode
    console.log("Development mode: IP restriction disabled");
    return next();
  }

  const clientIP =
    req.headers["x-forwarded-for"] || req.connection.remoteAddress;

  console.log("Detected IP:", clientIP); // Log the IP for debugging

  // Check if the client IP is in the allowed list
  if (allowedIPs.includes(clientIP)) {
    next();
  } else {
    res.status(403).json({ error: "Access denied. Your IP is not allowed." });
  }
});

// Enable CORS for all routes
app.use(cors());

// Use Express built-in middleware for body parsing
app.use(express.urlencoded({ extended: false })); // Middleware to parse incoming requests with url-encoded payloads
app.use(express.json()); // Middleware to parse incoming JSON requests

const PORT = process.env.PORT || 3003;

// Connect to MongoDB using Mongoose
connectDB();

// Use user routes for the API
app.use("/api", routerRestaurant);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
