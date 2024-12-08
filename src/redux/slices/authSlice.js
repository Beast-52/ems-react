// Import necessary libraries and data
import { createSlice } from "@reduxjs/toolkit";
import { employee, admin } from "../../utils/data";
import {
  getLocalAuthData,
  getLocalUsersData,
  removeLocalAuthData,
  removeLocalTaskData,
} from "../../utils/localStorage";

// Create the authSlice
const authSlice = createSlice({
  name: "user",
  initialState: {
    user: getLocalAuthData() || null,
    isAuthenticated: false,
    error: null,
    usersData: getLocalUsersData() || [],
  },
  reducers: {
    loginUser: (state, action) => {
      const { email, password } = action.payload;

      const user = employee.find(
        (item) => item.email === email && item.password === password
      );
      const adminUser = admin.email === email && admin.password === password;
      if (user) {
        state.user = user;
        state.isAuthenticated = true;
        state.usersData = null;
      } else if (adminUser) {
        state.user = admin;
        state.isAuthenticated = true;
        state.usersData = employee;
      } else {
        state.error = "Invalid email or password.";
      }
    },
    logoutUser: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.usersData = null;
      removeLocalAuthData();
      removeLocalTaskData();
    },
  },
});

// Export actions for use in components
export const { loginUser, logoutUser } = authSlice.actions;

// Export the reducer to be used in the store
export default authSlice.reducer;
