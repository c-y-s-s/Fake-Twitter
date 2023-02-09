// Need to use the React-specific entry point to allow generating React hooks
import { createSlice } from "@reduxjs/toolkit";

export interface controllerState {
  tabList: string;
  userPublishedModal: boolean;
}

const initialState: controllerState = {
  tabList: "For You",
  userPublishedModal: false,
};

export const controllerSlice = createSlice({
  name: "controller",
  initialState,
  reducers: {
    tabListToggle: (state, action) => {
      state.tabList = action.payload;
    },
    userPublishedModalToggle: (state, action) => {
      state.userPublishedModal = action.payload;
    },
  },
});

export const { tabListToggle, userPublishedModalToggle } =
  controllerSlice.actions;

const controllerSliceReducer = controllerSlice.reducer;

export default controllerSliceReducer;
