import { createSlice } from "@reduxjs/toolkit";
import { resetPassword } from "../../services/userService.js";

const initialState = {
  passwordChangeSuccess: false,
  passwordChangeError: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setPasswordChangeSuccess: (state) => {
      state.passwordChangeSuccess = true;
    },
    setPasswordChangeFailure: (state, action) => {
      state.passwordChangeError = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(resetPassword.pending, (state) => {
        state.passwordChangeSuccess = false;
        state.passwordChangeError = null;
      })
      .addCase(resetPassword.fulfilled, (state) => {
        state.passwordChangeSuccess = true;
      })
      .addCase(resetPassword.rejected, (state, action) => {
        state.passwordChangeError = action.payload;
      });
  },
});

export const { setPasswordChangeSuccess, setPasswordChangeFailure } =
  userSlice.actions;
export default userSlice.reducer;
export { resetPassword };
