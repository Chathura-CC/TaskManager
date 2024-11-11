import { createSlice } from "@reduxjs/toolkit";
import { signupUserAsync, loginUserAsync } from "../../services/authService.js"; // Import the async thunks

const initialState = {
  token: localStorage.getItem("token") || null,
  user: null,
  loading: false,
  error: null,
  signupSuccess: false,
  role: "",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setLoading: (state) => {
      state.loading = true;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    logout: (state) => {
      state.token = null;
      state.user = null;
      state.role = "";
      localStorage.removeItem("token");
    },
    setSignupSuccess: (state) => {
      state.signupSuccess = true;
    },
    setTokenFromLocalStorage: (state, action) => {
      state.token = action.payload;
      localStorage.setItem("token", action.payload);
    },
    setRole: (state, action) => {
      state.role = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signupUserAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(signupUserAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.signupSuccess = true;
        state.role = action.payload.role;
      })
      .addCase(signupUserAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(loginUserAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(loginUserAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action.payload.token;
        state.user = action.payload.user;
        state.role = action.payload.user.role;
        localStorage.setItem("token", action.payload.token);
      })
      .addCase(loginUserAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const {
  setLoading,
  setError,
  logout,
  setSignupSuccess,
  setTokenFromLocalStorage,
  setRole,
} = authSlice.actions;

export default authSlice.reducer;

export { loginUserAsync, signupUserAsync };
