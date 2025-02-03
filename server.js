import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/Connection.js";
import routerRestaurant from "./routes/routerResturant.js";

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3003;

// CORS Configuration
const corsOptions = {
  origin:
    process.env.NODE_ENV === "development"
      ? "http://localhost:8081" // Allow localhost during development
      : process.env.FRONTEND_URL || "*", // Allow only the specified frontend in production
};

app.use(cors(corsOptions)); // Enable CORS for all routes

// Middleware to restrict access by IP
app.use((req, res, next) => {
  if (process.env.NODE_ENV === "development" || process.env.ALLOW_ALL === "true") {
    console.log("Development mode: IP restriction disabled");
    return next();
  }

  // Extract client IP (Handle proxies like Render)
  const clientIP = req.headers["x-forwarded-for"]?.split(",")[0] || req.socket.remoteAddress;

  console.log("Detected IP:", clientIP); // Log for debugging

  // Allowed IPs list
  const allowedIPs = [
    "35.160.120.126", // Example Allowed IP
    "44.233.151.27",
    "34.211.200.85",
    "::1", // IPv6 localhost
    "127.0.0.1", // IPv4 localhost
  ];

  if (allowedIPs.includes(clientIP)) {
    next();
  } else {
    res.status(403).json({ error: `Access denied for IP: ${clientIP}` });
  }
});

// Middleware to parse JSON and URL-encoded data
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Connect to MongoDB
connectDB();

// Use restaurant routes
app.use("/api", routerRestaurant);

// Start the server
app.listen(PORT, () => {
  console.log(`✅ Server is running on port ${PORT}`);
});
