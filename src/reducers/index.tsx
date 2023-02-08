import { configureStore } from "@reduxjs/toolkit";
import controllerSliceReducer from "./controller";

export const store = configureStore({
  reducer: {
    controllerSliceReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
