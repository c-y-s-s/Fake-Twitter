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
     
      if (action.payload.photoURL === null) {
        state.userData = {
          ...action.payload,
          photoURL:
            "https://firebasestorage.googleapis.com/v0/b/leo-project-2feea.appspot.com/o/5wtqshRu_400x400.jpg?alt=media&token=585c49af-3ac3-48e1-ad25-c70570926760",
        };
      } else {
        state.userData = action.payload;
      }
    },
  },
});

export const { setUserData } = userSlice.actions;

const userSliceReducer = userSlice.reducer;

export default userSliceReducer;
