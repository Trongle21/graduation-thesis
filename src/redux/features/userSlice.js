import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    users: {
      isFetching: false,
      allUsers: null,
      allUsersDeleted: null,
      currentUser: null,
      error: false,
    },
    message: "",
  },
  reducers: {
    getUserStart: (state) => {
      state.users.isFetching = true;
    },
    getUserSuccess: (state, action) => {
      state.users.isFetching = false;
      state.users.allUsers = action.payload;
    },
    getUserFailed: (state) => {
      state.users.isFetching = false;
      state.users.error = true;
    },
    getUserDeletedStart: (state) => {
      state.users.isFetching = true;
    },
    getUserDeletedSuccess: (state, action) => {
      state.users.isFetching = false;
      state.users.allUsersDeleted = action.payload;
    },
    getUserDeletedFailed: (state) => {
      state.users.isFetching = false;
      state.users.error = true;
    },
    updateUserStart: (state) => {
      state.users.isFetching = true;
    },
    updateUserSuccess: (state, action) => {
      state.users.isFetching = false;
      state.users.currentUser = action.payload;
    },
    updateUserFailed: (state) => {
      state.users.isFetching = false;
      state.users.error = true;
    },
    deleteUserStart: (state) => {
      state.users.isFetching = true;
    },
    deleteUserSuccess: (state, action) => {
      state.users.isFetching = false;
      state.message = action.payload;
    },
    deleteUserFailed: (state, action) => {
      state.users.isFetching = false;
      state.users.error = true;
      state.message = action.payload;
    },
    restoreUserStart: (state) => {
      state.users.isFetching = true;
    },
    restoreUserSuccess: (state, action) => {
      state.users.isFetching = false;
      state.message = action.payload;
    },
    restoreUserFailed: (state, action) => {
      state.users.isFetching = false;
      state.users.error = true;
    },
  },
});

export const {
  getUserStart,
  getUserSuccess,
  getUserFailed,
  getUserDeletedStart,
  getUserDeletedSuccess,
  getUserDeletedFailed,
  updateUserStart,
  updateUserSuccess,
  updateUserFailed,
  deleteUserStart,
  deleteUserSuccess,
  deleteUserFailed,
  restoreUserStart,
  restoreUserSuccess,
  restoreUserFailed,
} = userSlice.actions;
export default userSlice.reducer;
