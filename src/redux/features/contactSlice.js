import { createSlice } from "@reduxjs/toolkit";

const contactSlice = createSlice({
  name: "contact",
  initialState: {
    contacts: {
      isFetching: false,
      allContact: null,
      allContactDeleted: null,
      currentContact: null,
      error: false,
    },
    message: "",
  },
  reducers: {
    getContactStart: (state) => {
      state.contacts.isFetching = true;
    },
    getContactSuccess: (state, action) => {
      state.contacts.allContact = action.payload;
    },
    getContactFailed: (state) => {
      state.contacts.error = true;
    },
    getContactDeletedStart: (state) => {
      state.contacts.isFetching = true;
    },
    getContactDeletedSuccess: (state, action) => {
      state.contacts.isFetching = false;
      state.contacts.allContactDeleted = action.payload;
    },
    getContactDeletedFailed: (state) => {
      state.contacts.isFetching = false;
      state.contacts.error = true;
    },
    createContactStart: (state) => {
      state.contacts.isFetching = true;
    },
    createContactSuccess: (state, action) => {
      state.contacts.isFetching = false;
    },
    createContactFailed: (state) => {
      state.contacts.isFetching = false;
      state.contacts.error = true;
    },
    updateContactStart: (state) => {
      state.contacts.isFetching = true;
    },
    updateContactSuccess: (state, action) => {
      state.contacts.isFetching = false;
      state.contacts.currentContact = action.payload;
    },
    updateContactFailed: (state) => {
      state.contacts.isFetching = false;
      state.contacts.error = true;
    },
    deleteContactStart: (state) => {
      state.contacts.isFetching = true;
    },
    deleteContactSuccess: (state, action) => {
      state.contacts.isFetching = false;
      state.message = action.payload;
    },
    deleteContactFailed: (state, action) => {
      state.contacts.isFetching = false;
      state.contacts.error = true;
      state.message = action.payload;
    },
    restoreContactStart: (state) => {
      state.contacts.isFetching = true;
    },
    restoreContactSuccess: (state, action) => {
      state.contacts.isFetching = false;
      state.message = action.payload;
    },
    restoreContactFailed: (state, action) => {
      state.contacts.isFetching = false;
      state.contacts.error = true;
    },
  },
});

export const {
  getContactStart,
  getContactSuccess,
  getContactFailed,
  getContactDeletedStart,
  getContactDeletedSuccess,
  getContactDeletedFailed,
  createContactStart,
  createContactSuccess,
  createContactFailed,
  updateContactStart,
  updateContactSuccess,
  updateContactFailed,
  deleteContactStart,
  deleteContactSuccess,
  deleteContactFailed,
  restoreContactStart,
  restoreContactSuccess,
  restoreContactFailed,
} = contactSlice.actions;
export default contactSlice.reducer;
