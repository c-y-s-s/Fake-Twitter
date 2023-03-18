// Need to use the React-specific entry point to allow generating React hooks
import { createSlice } from "@reduxjs/toolkit";

export interface controllerState {
  tabList: string;
  userPublishedModal: boolean;
  rightSideBarSearchExpand: boolean;
  userLogin: any;
  loginModalOpen: boolean;
  registerModalOpen: boolean;
}

const initialState: controllerState = {
  tabList: "For You",
  userPublishedModal: false,
  rightSideBarSearchExpand: false,
  userLogin: null,
  loginModalOpen: false,
  registerModalOpen: false,
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
    rightSideBarSearchExpandToggle: (state, action) => {
      state.rightSideBarSearchExpand = action.payload;
    },
    setUserLogin: (state, action) => {
      state.userLogin = action.payload;
    },
    setLoginModalOpen: (state, action) => {
      state.loginModalOpen = action.payload;
    },
    setRegisterModalOpen: (state, action) => {
      state.registerModalOpen = action.payload;
    },
  },
});

export const {
  tabListToggle,
  userPublishedModalToggle,
  rightSideBarSearchExpandToggle,
  setUserLogin,
  setLoginModalOpen,
  setRegisterModalOpen,
} = controllerSlice.actions;

const controllerSliceReducer = controllerSlice.reducer;

export default controllerSliceReducer;
