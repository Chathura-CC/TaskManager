import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

const API_URL = "http://localhost:5000/api/users";

export const signupUserAsync = createAsyncThunk(
  "auth/signupUserAsync",
  async ({ username, email, password, role }, thunkAPI) => {
    try {
      const response = await axios.post(`${API_URL}/signup`, {
        username,
        email,
        password,
        role,
      });
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const loginUserAsync = createAsyncThunk(
  "auth/loginUserAsync",
  async ({ email, password }, thunkAPI) => {
    try {
      const response = await axios.post(`${API_URL}/login`, {
        email,
        password,
      });
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);
