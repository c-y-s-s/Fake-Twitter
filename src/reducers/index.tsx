import { configureStore } from "@reduxjs/toolkit";
import controllerSliceReducer from "./controller";
import otherUserDataSliceReducer from "./otherUserData";

export const store = configureStore({
  reducer: {
    controllerSliceReducer,
    otherUserDataSliceReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
