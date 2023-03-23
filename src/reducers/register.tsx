// Need to use the React-specific entry point to allow generating React hooks
import { createSlice } from "@reduxjs/toolkit";

type registerDataType = {
  name: string;
  mail: string;
  year: string;
  month: string;
  day: string;
};
export interface registerState {
  registerData: registerDataType;
  mailVerifyText: string;
}

const initialState: registerState = {
  registerData: {
    name: "",
    mail: "",
    year: "",
    month: "",
    day: "",
  },
  mailVerifyText: "",
};

export const registerSlice = createSlice({
  name: "register",
  initialState,
  reducers: {
    setMailVerifyText: (state, action) => {
      state.mailVerifyText = action.payload;
    },
    setRegisterData: (state, action) => {
      state.registerData = action.payload;
    },
  },
});

export const { setMailVerifyText, setRegisterData } = registerSlice.actions;

const registerSliceReducer = registerSlice.reducer;

export default registerSliceReducer;
