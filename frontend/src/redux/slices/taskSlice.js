import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as taskService from "../../services/taskService";
import * as userService from "../../services/userService";

// Fetch all users
export const fetchUsersAsync = createAsyncThunk(
  "tasks/fetchUsersAsync",
  async (_, thunkAPI) => {
    try {
      const users = await userService.getUsers();
      return users;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// Fetch tasks with optional filters (status, priority, sortBy)
export const fetchTasksAsync = createAsyncThunk(
  "tasks/fetchTasksAsync",
  async (filters, thunkAPI) => {
    try {
      const tasks = await taskService.getTasks(filters);
      return tasks;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// Create a new task
export const createTaskAsync = createAsyncThunk(
  "tasks/createTaskAsync",
  async (taskData, thunkAPI) => {
    try {
      const newTask = await taskService.createTask(taskData);
      return newTask;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// Update an existing task
export const updateTaskAsync = createAsyncThunk(
  "tasks/updateTaskAsync",
  async (taskData, thunkAPI) => {
    try {
      const taskId = taskData._id;

      console.log(
        "Updating task at URL:",
        `http://localhost:5000/api/tasks/${taskId}`
      );

      const updatedTask = await taskService.updateTask(taskId, taskData);
      return updatedTask;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// Delete a task
export const deleteTaskAsync = createAsyncThunk(
  "tasks/deleteTaskAsync",
  async (taskId, thunkAPI) => {
    try {
      await taskService.deleteTask(taskId);
      return taskId;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// Task slice
const taskSlice = createSlice({
  name: "tasks",
  initialState: {
    tasks: [],
    users: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    // Fetch tasks cases
    builder
      .addCase(fetchTasksAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchTasksAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.tasks = action.payload;
      })
      .addCase(fetchTasksAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Create task cases
      .addCase(createTaskAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(createTaskAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.tasks.push(action.payload);
      })
      .addCase(createTaskAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Update task cases
      .addCase(updateTaskAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateTaskAsync.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.tasks.findIndex(
          (task) => task._id === action.payload._id
        );
        if (index !== -1) {
          state.tasks[index] = action.payload;
        }
      })
      .addCase(updateTaskAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Delete task cases
      .addCase(deleteTaskAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteTaskAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.tasks = state.tasks.filter((task) => task._id !== action.payload);
      })
      .addCase(deleteTaskAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Fetch users cases
      .addCase(fetchUsersAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUsersAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload;
      })
      .addCase(fetchUsersAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default taskSlice.reducer;
