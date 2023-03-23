// Need to use the React-specific entry point to allow generating React hooks
import { createSlice } from "@reduxjs/toolkit";

export interface postPublishedState {
  imgFile: any;
  inputValue: string;
}

const initialState: postPublishedState = {
  imgFile: null,
  inputValue: "",
};

export const postPublishedSlice = createSlice({
  name: "controller",
  initialState,
  reducers: {
    setImgFile: (state, action) => {
      state.imgFile = action.payload;
    },
    setInputValue: (state, action) => {
      state.inputValue = action.payload;
    },
  },
});

export const { setImgFile, setInputValue } = postPublishedSlice.actions;

const postPublishedSliceReducer = postPublishedSlice.reducer;

export default postPublishedSliceReducer;
