import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

mongoose.connection.on("connected", () => {
  console.log(`MongoDB Connected: ${mongoose.connection.host}`);
});

mongoose.connection.on("error", (err) => {
  console.error("MongoDB connection error:", err);
  process.exit(1);
});

mongoose.connection.on("disconnected", () => {
  console.log("MongoDB disconnected");
});

const connectDB = async () => {
  try {
    // With Mongoose v6+, options like useNewUrlParser and useUnifiedTopology are not needed.
    await mongoose.connect(process.env.MONGODB_URI, {
      serverSelectionTimeoutMS: 5000, // Optional: reduces the timeout period
      socketTimeoutMS: 45000, // Optional: sets socket timeout
    });
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

export default connectDB;
