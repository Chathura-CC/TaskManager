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

router.post("/signup", signup);

router.post("/login", login);

router.post("/logout", logout);

router.patch("/update-password", protect, updatePassword);

router.get("/current-user", protect, getCurrentUser);

router.get("/all", protect, getUsers);
export default router;
