import axios from "axios";

const API_URL = "http://localhost:5000/api/tasks";

// Get tasks with optional filters
export const getTasks = async (filters = {}) => {
  const { status, priority, sortBy } = filters;
  try {
    const response = await axios.get(API_URL, {
      params: { status, priority, sortBy },
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Error fetching tasks");
  }
};

// Create a new task
export const createTask = async (taskData) => {
  try {
    const response = await axios.post(API_URL, taskData, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Error creating task");
  }
};

// Update an existing task
// Update task function
export const updateTask = async (taskId, taskData) => {
  try {
    const response = await axios.patch(`${API_URL}/${taskId}`, taskData, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Error updating task");
  }
};

// Delete a task
export const deleteTask = async (taskId) => {
  try {
    const response = await axios.delete(`${API_URL}/${taskId}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Error deleting task");
  }
};
