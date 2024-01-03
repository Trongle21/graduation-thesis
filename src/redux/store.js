import { configureStore, combineReducers } from "@reduxjs/toolkit";
import authSlice from "./features/authSlice";
import userSlice from "./features/userSlice";
import apiReducer from "./features/apiSlice";
import cartSlice from "./features/cartSlice";
import productSlice from "./features/productSlice";
import petsSlice from "./features/petsSlice";
import servicePackSlice from "./features/servicePackSlice";
import appointmentSlice from "./features/appointment";
import orderSlice from "./features/orderSlice";
import contactSlice from "./features/contactSlice";

import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistConfig = {
  key: "root",
  version: 1,
  storage,
};

const rootReducer = combineReducers({
  auth: authSlice,
  users: userSlice,
  products: productSlice,
  pets: petsSlice,
  appointments: appointmentSlice,
  servicePack: servicePackSlice,
  order: orderSlice,
  contact: contactSlice,
  api: apiReducer.reducer,
  cart: cartSlice.reducer,
});
const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export let persistor = persistStore(store);
