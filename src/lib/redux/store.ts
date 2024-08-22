import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "./api/apiSlice";

export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
});

export default store;

export type RootState = ReturnType<typeof store.dispatch>;
export type AppDispatch = typeof store.dispatch;
