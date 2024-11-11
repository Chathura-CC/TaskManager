import Task from "../models/Task.js";
import moment from "moment";

// Controller to get analytics
export const getAnalytics = async (req, res) => {
  try {
    // Get the start and end of today
    const startOfToday = moment().startOf("day").toDate();
    const endOfToday = moment().endOf("day").toDate();

    // Total tasks
    const totalTasks = await Task.countDocuments();

    // Tasks due today
    const tasksDueToday = await Task.countDocuments({
      dueDate: { $gte: startOfToday, $lte: endOfToday },
      status: { $ne: "completed" },
    });

    console.log("tasksDueToday", tasksDueToday);

    // Overdue tasks
    const overdueTasks = await Task.countDocuments({
      dueDate: { $lt: startOfToday },
      status: { $ne: "completed" },
    });

    // Return the analytics
    res.status(200).json({
      totalTasks,
      tasksDueToday,
      overdueTasks,
    });
  } catch (error) {
    console.error("Error fetching analytics:", error);
    res.status(500).json({ message: "Error fetching analytics" });
  }
};
