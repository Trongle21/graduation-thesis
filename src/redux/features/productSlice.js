import { createSlice } from "@reduxjs/toolkit";

const productSlice = createSlice({
  name: "product",
  initialState: {
    products: {
      isFetching: false,
      allProducts: null,
      currentProduct: null,
      allUsersDeleted: null,
      error: false,
    },
    create: {
      isFetching: false,
      success: false,
      error: false,
    },
    message: "",
  },
  reducers: {
    getProductStart: (state) => {
      state.products.isFetching = true;
    },
    getProductSuccess: (state, action) => {
      state.products.isFetching = false;
      state.products.allProducts = action.payload;
    },
    getProductFailed: (state) => {
      state.products.isFetching = false;
      state.products.error = true;
    },
    getProductDeletedStart: (state) => {
      state.products.isFetching = true;
    },
    getProductDeletedSuccess: (state, action) => {
      state.products.isFetching = false;
      state.products.allProductsDeleted = action.payload;
    },
    getProductDeletedFailed: (state) => {
      state.products.isFetching = false;
      state.products.error = true;
    },
    createProductStart: (state) => {
      state.create.isFetching = true;
    },
    productsSuccess: (state) => {
      state.create.isFetching = false;
      state.create.success = true;
      state.create.error = false;
    },
    productsFailed: (state) => {
      state.create.isFetching = false;
      state.create.success = false;
      state.create.error = true;
    },
    updateProductStart: (state) => {
      state.products.isFetching = true;
    },
    updateProductSuccess: (state, action) => {
      state.products.isFetching = false;
      state.products.currentProduct = action.payload;
    },
    updateProductFailed: (state) => {
      state.products.isFetching = false;
      state.products.error = true;
    },
    deleteProductStart: (state) => {
      state.products.isFetching = true;
    },
    deleteProductSuccess: (state, action) => {
      state.products.isFetching = false;
      state.message = action.payload;
    },
    deleteProductFailed: (state, action) => {
      state.products.isFetching = false;
      state.products.error = true;
      state.message = action.payload;
    },
    restoreProductStart: (state) => {
      state.products.isFetching = true;
    },
    restoreProductSuccess: (state, action) => {
      state.products.isFetching = false;
      state.message = action.payload;
    },
    restoreProductFailed: (state, action) => {
      state.products.isFetching = false;
      state.products.error = true;
    },
  },
});

export const {
  getProductStart,
  getProductSuccess,
  getProductFailed,
  getProductDeletedStart,
  getProductDeletedSuccess,
  getProductDeletedFailed,
  createProductStart,
  createProductSuccess,
  createProductFailed,
  updateProductStart,
  updateProductSuccess,
  updateProductFailed,
  deleteProductStart,
  deleteProductSuccess,
  deleteProductFailed,
  restoreProductStart,
  restoreProductSuccess,
  restoreProductFailed,
} = productSlice.actions;
export default productSlice.reducer;
