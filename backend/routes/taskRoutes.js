import express from "express";
import {
  createTask,
  getTasks,
  getTask,
  updateTask,
  deleteTask,
  sendTaskReminder,
} from "../controllers/taskController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// Create a new task
router.post("/", protect, createTask);

// Get all tasks with filtering and sorting
router.get("/", protect, getTasks);

// Get a specific task
router.get("/:id", protect, getTask);

// Update a task
router.patch("/:id", protect, updateTask);

// Delete a task
router.delete("/:id", protect, deleteTask);

// Send task reminders
router.post("/send-reminders", sendTaskReminder);

export default router;
