import { configureStore } from "@reduxjs/toolkit";
import appReducer from "../features/app/appSlice";

const store = configureStore({
  reducer: appReducer,
});

export default store;
// Rootstate and dispatch type
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
