import { createSlice } from "@reduxjs/toolkit";

const orderSlice = createSlice({
  name: "order",
  initialState: {
    orders: {
      isFetching: false,
      allOrder: null,
      allOrderDeleted: null,
      currentOrder: null,
      error: false,
    },
    message: "",
  },
  reducers: {
    getOrderStart: (state) => {
      state.orders.isFetching = true;
    },
    getOrderSuccess: (state, action) => {
      state.orders.allOrder = action.payload;
    },
    getOrderFailed: (state) => {
      state.orders.error = true;
    },
    getOrderDeletedStart: (state) => {
      state.orders.isFetching = true;
    },
    getOrderDeletedSuccess: (state, action) => {
      state.orders.isFetching = false;
      state.orders.allOrderDeleted = action.payload;
    },
    getOrderDeletedFailed: (state) => {
      state.orders.isFetching = false;
      state.orders.error = true;
    },
    createOrderStart: (state) => {
      state.orders.isFetching = true;
    },
    createOrderSuccess: (state, action) => {
      state.orders.isFetching = false;
    },
    createOrderFailed: (state) => {
      state.orders.isFetching = false;
      state.orders.error = true;
    },
    updateOrderStart: (state) => {
      state.orders.isFetching = true;
    },
    updateOrderSuccess: (state, action) => {
      state.orders.isFetching = false;
      state.orders.currentOrder = action.payload;
    },
    updateOrderFailed: (state) => {
      state.orders.isFetching = false;
      state.orders.error = true;
    },
    deleteOrderStart: (state) => {
      state.orders.isFetching = true;
    },
    deleteOrderSuccess: (state, action) => {
      state.orders.isFetching = false;
      state.message = action.payload;
    },
    deleteOrderFailed: (state, action) => {
      state.orders.isFetching = false;
      state.orders.error = true;
      state.message = action.payload;
    },
    restoreOrderStart: (state) => {
      state.orders.isFetching = true;
    },
    restoreOrderSuccess: (state, action) => {
      state.orders.isFetching = false;
      state.message = action.payload;
    },
    restoreOrderFailed: (state, action) => {
      state.orders.isFetching = false;
      state.orders.error = true;
    },
  },
});

export const {
  getOrderStart,
  getOrderSuccess,
  getOrderFailed,
  getOrderDeletedStart,
  getOrderDeletedSuccess,
  getOrderDeletedFailed,
  createOrderStart,
  createOrderSuccess,
  createOrderFailed,
  updateOrderStart,
  updateOrderSuccess,
  updateOrderFailed,
  deleteOrderStart,
  deleteOrderSuccess,
  deleteOrderFailed,
  restoreOrderStart,
  restoreOrderSuccess,
  restoreOrderFailed,
} = orderSlice.actions;
export default orderSlice.reducer;
