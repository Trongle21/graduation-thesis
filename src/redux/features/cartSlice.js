import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  productsCart: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addProduct(state, action) {
      const exist = state.productsCart.findIndex(
        (product) => product.productId === action.payload.productId
      );
      if (exist !== -1) {
        state.productsCart[exist].quantity += action.payload.quantity;
      } else {
        state.productsCart.push(action.payload);
      }
    },
    deleteProduct(state, action) {
      state.productsCart = state.productsCart.filter(
        (product) => product.productId !== action.payload.productId
      );
    },
    deleteAllProduct(state, action) {
      state.productsCart = [];
    },
    decreaseProduct(state, action) {
    
      const decreaseProduct = state.productsCart.map((product) =>
        product.productId === action.payload.productId
          ? {
              ...product,
              quantity: product.quantity - 1,
            }
          : product
      );
      state.productsCart = decreaseProduct;
    },
    increaseProduct(state, action) {
      const increaseProduct = state.productsCart.map((product) =>
        product.productId === action.payload.productId
          ? {
              ...product,
              quantity: product.quantity + 1,
            }
          : product
      );
      state.productsCart = increaseProduct;
    },
  },
});

export const {
  addProduct,
  deleteProduct,
  deleteAllProduct,
  increaseProduct,
  decreaseProduct,
} = cartSlice.actions;

export default cartSlice;
