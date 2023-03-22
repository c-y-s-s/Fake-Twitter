// Need to use the React-specific entry point to allow generating React hooks
import { createSlice } from "@reduxjs/toolkit";

export interface userData {
  userData: {
    displayName: string;
    email: string;
    photoURL: string;
    uid: string;
    creationTime: string;
  };
}

const initialState: userData = {
  userData: {
    displayName: "",
    email: "",
    photoURL: "",
    uid: "",
    creationTime: "",
  },
};

export const userSlice = createSlice({
  name: "UserData",
  initialState,
  reducers: {
    setUserData: (state, action) => {
      state.userData = action.payload;
    },
  },
});

export const { setUserData } = userSlice.actions;

const userSliceReducer = userSlice.reducer;

export default userSliceReducer;
