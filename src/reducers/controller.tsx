// Need to use the React-specific entry point to allow generating React hooks
import { createSlice } from "@reduxjs/toolkit";

export interface controllerState {
  tabList: string;
}

const initialState: controllerState = {
  tabList: "For You",
};

export const controllerSlice = createSlice({
  name: "controller",
  initialState,
  reducers: {
    tabListToggle: (state, action) => {
      state.tabList = action.payload;
    },
  },
});

export const { tabListToggle } = controllerSlice.actions;

const controllerSliceReducer = controllerSlice.reducer;

export default controllerSliceReducer;
