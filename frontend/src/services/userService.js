import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "http://localhost:5000/api/users";

export const resetPassword = createAsyncThunk(
  "user/resetPassword",
  async ({ oldPassword, newPassword }, { getState, rejectWithValue }) => {
    try {
      const state = getState();
      const token = state.auth.token;
      if (!token) {
        return rejectWithValue("No authentication token found.");
      }

      const response = await axios.patch(
        `${API_URL}/update-password`,
        { oldPassword, newPassword },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Reset password failed"
      );
    }
  }
);

// Get all users
export const getUsers = async () => {
  try {
    const response = await axios.get(`${API_URL}/all`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Error fetching users");
  }
};
