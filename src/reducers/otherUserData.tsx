import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface otherUserDataStateProps {
  otherUserData: Array<otherUserDataProps>;
}

interface otherUserDataProps {
  id: string;
  userName: string;
  userSerialNumber: string;
  postingTime: string;
  text: string;
  image?: string;
  message: number;
  transfer: number;
  view: number;
  like: number;
}
const initialState: otherUserDataStateProps = {
  otherUserData: [
    {
      id: "1",
      userName: "Adelaide",
      userSerialNumber: "@adelaide",
      postingTime: "",
      text: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Enim culpa et adipisci voluptas, quod, doloremque asperiores modi, voluptates sequi repellat architecto incidunt nihil placeat atque. Deleniti voluptas quod hic suscipit!",
      image: "",
      message: 22,
      transfer: 2,
      view: 1,
      like: 2,
    },
    {
      id: "2",
      userName: "Alex",
      userSerialNumber: "@alex",
      postingTime: "",
      text: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Enim culpa et adipisci voluptas, quod, doloremque asperiores modi, voluptates sequi repellat architecto incidunt nihil placeat atque. Deleniti voluptas quod hic suscipit!",
      image: "",
      message: 12,
      transfer: 2,
      view: 1,
      like: 2,
    },
    {
      id: "3",
      userName: "Aggie",
      userSerialNumber: "@aggie",
      postingTime: "",
      text: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Enim culpa et adipisci voluptas, quod, doloremque asperiores modi, voluptates sequi repellat architecto incidunt nihil placeat atque. Deleniti voluptas quod hic suscipit!",
      image: "",
      message: 262,
      transfer: 26,
      view: 451,
      like: 25,
    },
    {
      id: "4",
      userName: "Alexandra",
      userSerialNumber: "@alexandra",
      postingTime: "",
      text: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Enim culpa et adipisci voluptas, quod, doloremque asperiores modi, voluptates sequi repellat architecto incidunt nihil placeat atque. Deleniti voluptas quod hic suscipit!",
      image: "",
      message: 22,
      transfer: 2,
      view: 1,
      like: 2,
    },
    {
      id: "5",
      userName: "Alexis",
      userSerialNumber: "@alexis",
      postingTime: "",
      text: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Enim culpa et adipisci voluptas, quod, doloremque asperiores modi, voluptates sequi repellat architecto incidunt nihil placeat atque. Deleniti voluptas quod hic suscipit!",
      image: "",
      message: 212,
      transfer: 23,
      view: 144,
      like: 212,
    },
  ],
};

export const otherUserDataSlice = createSlice({
  name: "otherUserData",
  initialState,
  reducers: {
    otherUserDataChange: (state, action) => {
      state.otherUserData = action.payload;
    },
    addArticle: (state, action: PayloadAction<otherUserDataProps>) => {
      state.otherUserData = [...state.otherUserData, action.payload];
    },
  },
});

export const { otherUserDataChange, addArticle } = otherUserDataSlice.actions;

const otherUserDataSliceReducer = otherUserDataSlice.reducer;

export default otherUserDataSliceReducer;
