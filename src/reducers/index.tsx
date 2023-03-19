import { configureStore } from "@reduxjs/toolkit";
import { searchApi } from "../api/searchApi";
import controllerSliceReducer from "./controller";
import otherUserDataSliceReducer from "./otherUserData";
import registerSliceReducer from "./register";

export const store = configureStore({
  reducer: {
    [searchApi.reducerPath]: searchApi.reducer,
    controllerSliceReducer,
    otherUserDataSliceReducer,
    registerSliceReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }).concat(
      searchApi.middleware
    ),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
