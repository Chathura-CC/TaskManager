import express from "express";
import {
  signup,
  login,
  logout,
  updatePassword,
  getCurrentUser,
  getUsers,
} from "../controllers/authController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();
// Signup
router.post("/signup", signup);
// Login
router.post("/login", login);
// Logout
router.post("/logout", logout);
// Update Password
router.patch("/update-password", protect, updatePassword);
// Current User
router.get("/current-user", protect, getCurrentUser);
// Get All Users
router.get("/all", protect, getUsers);
export default router;
