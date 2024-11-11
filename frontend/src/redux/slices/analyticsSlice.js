import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchAnalytics } from "../../services/analyticsService";

// Async action to fetch analytics data
export const getAnalyticsAsync = createAsyncThunk(
  "analytics/getAnalyticsAsync",
  async (token, thunkAPI) => {
    try {
      const data = await fetchAnalytics(token);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

const initialState = {
  totalTasks: 0,
  tasksDueToday: 0,
  overdueTasks: 0,
  loading: false,
  error: null,
};

const analyticsSlice = createSlice({
  name: "analytics",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAnalyticsAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAnalyticsAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.totalTasks = action.payload.totalTasks;
        state.tasksDueToday = action.payload.tasksDueToday;
        state.overdueTasks = action.payload.overdueTasks;
      })
      .addCase(getAnalyticsAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default analyticsSlice.reducer;
