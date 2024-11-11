// src/routes/analyticsRoutes.js
import express from "express";
import { protectAdmin } from "../middleware/authMiddleware.js"; // Custom middleware to protect admin routes
import { getAnalytics } from "../controllers/analyticsController.js";
import { protect } from "../middleware/authMiddleware.js"; // Protect middleware ensures the user is authenticated

const router = express.Router();

// Analytics Dashboard - Only accessible by admin users
router.get("/", protect, protectAdmin, getAnalytics);

export default router;
