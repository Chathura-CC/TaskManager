import Task from "../models/Task.js";
import nodemailer from "nodemailer";
import cron from "node-cron";

// Create a new task
export const createTask = async (req, res) => {
  console.log("Authenticated User:", req.user);
  const { title, description, status, priority, dueDate, assignedTo } =
    req.body;

  try {
    const task = new Task({
      title,
      description,
      status,
      priority,
      dueDate,
      createdBy: req.user.userId,
      assignedTo,
      auditLog: [{ action: "Task created", changedBy: req.user.userId }],
    });

    await task.save();
    res.status(201).json(task);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error creating task", error: error.message });
  }
};

// Get all tasks (with filtering and sorting)
export const getTasks = async (req, res) => {
  const { status, priority, sortBy } = req.query;
  const filter = {};

  if (status) filter.status = status;
  if (priority) filter.priority = priority;

  try {
    const tasks = await Task.find(filter)
      .populate("createdBy", "name email")
      .populate("assignedTo", "username name email") // Populate assignedTo with username
      .populate({
        path: "auditLog.changedBy",
        select: "username",
      })
      .sort(sortBy ? { [sortBy]: 1 } : { createdAt: -1 });

    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({
      message: "Error fetching tasks",
      error: error.message,
    });
  }
};

// Get a specific task
export const getTask = async (req, res) => {
  const taskId = req.params.id;

  try {
    const task = await Task.findById(taskId)
      .populate("createdBy")
      .populate("assignedTo"); // Ensure assignedTo is populated

    if (!task) return res.status(404).json({ message: "Task not found" });

    res.status(200).json(task);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching task", error: error.message });
  }
};

// Update a task
export const updateTask = async (req, res) => {
  const taskId = req.params.id;
  const { title, description, status, priority, dueDate, assignedTo } =
    req.body;

  try {
    let task = await Task.findById(taskId);
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    // Add an entry to the audit log when the task is updated
    task.auditLog.push({
      action: "Task updated",
      changedBy: req.user.userId,
      timestamp: new Date(),
    });

    // Update task fields
    task.title = title || task.title;
    task.description = description || task.description;
    task.status = status || task.status;
    task.priority = priority || task.priority;
    task.dueDate = dueDate || task.dueDate;
    task.assignedTo = assignedTo || task.assignedTo;

    // Save updated task
    const updatedTask = await task.save();

    // Return updated task data
    await updatedTask.populate("createdBy assignedTo");

    res.status(200).json(updatedTask);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Error updating task", error: error.message });
  }
};

// Delete a task
export const deleteTask = async (req, res) => {
  const taskId = req.params.id;

  try {
    const task = await Task.findByIdAndDelete(taskId);
    if (!task) return res.status(404).json({ message: "Task not found" });

    res.status(200).json({ message: "Task deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error deleting task", error: error.message });
  }
};

// Notification send email if task is due in 24 hours
export const sendTaskReminder = async () => {
  try {
    const tasksDueSoon = await Task.find({
      dueDate: { $lte: new Date(Date.now() + 24 * 60 * 60 * 1000) },
      status: { $ne: "completed" },
    }).populate("assignedTo");

    tasksDueSoon.forEach((task) => {
      const userEmail = task.assignedTo.email;
      const taskTitle = task.title;
      sendEmailReminder(userEmail, taskTitle);
    });
  } catch (error) {
    console.error("Error sending task reminders:", error);
  }
};

// Send email reminders
const sendEmailReminder = async (to, taskTitle) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to,
    subject: `Reminder: Task "${taskTitle}" is due soon!`,
    text: `This is a reminder that the task "${taskTitle}" is due soon. Please complete it as soon as possible.`,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`Reminder sent for task: ${taskTitle}`);
  } catch (error) {
    console.error("Error sending email:", error);
  }
};

// Cron job: Run every hour to check for tasks due soon
cron.schedule("0 * * * *", () => {
  console.log("Running task reminder cron job...");
  sendTaskReminder(); // Send task reminders every hour
});
