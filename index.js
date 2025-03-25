import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import userRoutes from "./routes/userRoutes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());

const corsOptions = {
  origin: "http://192.168.100.7:5173", // Allow requests from your domain
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"], // Specify allowed methods
  allowedHeaders: ["Content-Type", "Authorization"], // Specify allowed headers
};
app.use(cors(corsOptions));

// Connect to MongoDB
connectDB();

// Mount routes
app.use("/api/user", userRoutes);

// Sample route
app.get("/", (req, res) => {
  res.send("Welcome to MS Jantri Backend");
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
