import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import userRoutes from "./routes/userRoutes.js";
dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(cookieParser());
app.use(express.json()); // Body parser for JSON requests

// Connect to the database
connectDB();

// Routes
app.use("/api/users", userRoutes);

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
