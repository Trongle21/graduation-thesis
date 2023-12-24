import { createSlice } from "@reduxjs/toolkit";

const servicePacksSlice = createSlice({
  name: "servicePack",
  initialState: {
    servicePacks: {
      isFetching: false,
      allServicePacks: null,
      allServicePacksDeleted: null,
      currentServicePack: null,
      error: false,
    },
    message: "",
  },
  reducers: {
    getServicePackStart: (state) => {
      state.servicePacks.isFetching = true;
    },
    getServicePackSuccess: (state, action) => {
      state.servicePacks.isFetching = false;
      state.servicePacks.allServicePacks = action.payload;
    },
    getServicePackFailed: (state) => {
      state.servicePacks.isFetching = false;
      state.servicePacks.error = true;
    },
    getServicePackDeletedStart: (state) => {
      state.servicePacks.isFetching = true;
    },
    getServicePackDeletedSuccess: (state, action) => {
      state.servicePacks.isFetching = false;
      state.servicePacks.allServicePacksDeleted = action.payload;
    },
    getServicePackDeletedFailed: (state) => {
      state.servicePacks.isFetching = false;
      state.servicePacks.error = true;
    },
    createServicePackStart: (state) => {
      state.servicePacks.isFetching = true;
    },
    createServicePackSuccess: (state, action) => {
      state.servicePacks.isFetching = false;
    },
    createServicePackFailed: (state) => {
      state.servicePacks.isFetching = false;
      state.servicePacks.error = true;
    },
    updateServicePackStart: (state) => {
      state.servicePacks.isFetching = true;
    },
    updateServicePackSuccess: (state, action) => {
      state.servicePacks.isFetching = false;
      state.servicePacks.currentServicePack = action.payload;
    },
    updateServicePackFailed: (state) => {
      state.servicePacks.isFetching = false;
      state.servicePacks.error = true;
    },
    deleteServicePackStart: (state) => {
      state.servicePacks.isFetching = true;
    },
    deleteServicePackSuccess: (state, action) => {
      state.servicePacks.isFetching = false;
      state.message = action.payload;
    },
    deleteServicePackFailed: (state, action) => {
      state.servicePacks.isFetching = false;
      state.servicePacks.error = true;
      state.message = action.payload;
    },
    restoreServicePackStart: (state) => {
      state.servicePacks.isFetching = true;
    },
    restoreServicePackSuccess: (state, action) => {
      state.servicePacks.isFetching = false;
      state.message = action.payload;
    },
    restoreServicePackFailed: (state, action) => {
      state.servicePacks.isFetching = false;
      state.servicePacks.error = true;
    },
  },
});

export const {
  getServicePackStart,
  getServicePackSuccess,
  getServicePackFailed,
  getServicePackDeletedStart,
  getServicePackDeletedSuccess,
  getServicePackDeletedFailed,
  createServicePackStart,
  createServicePackSuccess,
  createServicePackFailed,
  updateServicePackStart,
  updateServicePackSuccess,
  updateServicePackFailed,
  deleteServicePackStart,
  deleteServicePackSuccess,
  deleteServicePackFailed,
  restoreServicePackStart,
  restoreServicePackSuccess,
  restoreServicePackFailed,
} = servicePacksSlice.actions;
export default servicePacksSlice.reducer;
