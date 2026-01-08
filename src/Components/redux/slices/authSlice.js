import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,      // logged in user data
  loading: false,  // true when request going on
  error: null,     // error message if any
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    authStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    authSuccess: (state, action) => {
      state.loading = false;
      state.user = action.payload;
      state.error = null;
    },
    authFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    logout: (state) => {
      state.user = null;
      state.loading = false;
      state.error = null;
    },
  },
});

export const { authStart, authSuccess, authFailure, logout } = authSlice.actions;

export default authSlice.reducer;
