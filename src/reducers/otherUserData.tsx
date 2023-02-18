import { compose, createSlice, PayloadAction } from "@reduxjs/toolkit";

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
  like: { number: number; userClick: boolean };
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
      like: {
        number: 212,
        userClick: false,
      },
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
      like: {
        number: 212,
        userClick: false,
      },
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
      like: {
        number: 212,
        userClick: false,
      },
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
      like: {
        number: 212,
        userClick: false,
      },
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
      like: {
        number: 212,
        userClick: false,
      },
    },
    {
      id: "6",
      userName: "6666",
      userSerialNumber: "@6666",
      postingTime: "",
      text: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Enim culpa et adipisci voluptas, quod, doloremque asperiores modi, voluptates sequi repellat architecto incidunt nihil placeat atque. Deleniti voluptas quod hic suscipit!",
      image: "",
      message: 212,
      transfer: 23,
      view: 144,
      like: {
        number: 212,
        userClick: false,
      },
    },
    {
      id: "7",
      userName: "7777",
      userSerialNumber: "@7777",
      postingTime: "",
      text: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Enim culpa et adipisci voluptas, quod, doloremque asperiores modi, voluptates sequi repellat architecto incidunt nihil placeat atque. Deleniti voluptas quod hic suscipit!",
      image: "",
      message: 212,
      transfer: 23,
      view: 144,
      like: {
        number: 212,
        userClick: false,
      },
    },
    {
      id: "8",
      userName: "8888",
      userSerialNumber: "@8888",
      postingTime: "",
      text: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Enim culpa et adipisci voluptas, quod, doloremque asperiores modi, voluptates sequi repellat architecto incidunt nihil placeat atque. Deleniti voluptas quod hic suscipit!",
      image: "",
      message: 212,
      transfer: 23,
      view: 144,
      like: {
        number: 212,
        userClick: false,
      },
    },
    {
      id: "9",
      userName: "9999",
      userSerialNumber: "@9999",
      postingTime: "",
      text: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Enim culpa et adipisci voluptas, quod, doloremque asperiores modi, voluptates sequi repellat architecto incidunt nihil placeat atque. Deleniti voluptas quod hic suscipit!",
      image: "",
      message: 212,
      transfer: 23,
      view: 144,
      like: {
        number: 212,
        userClick: false,
      },
    },
    {
      id: "10",
      userName: "10",
      userSerialNumber: "@10",
      postingTime: "",
      text: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Enim culpa et adipisci voluptas, quod, doloremque asperiores modi, voluptates sequi repellat architecto incidunt nihil placeat atque. Deleniti voluptas quod hic suscipit!",
      image: "",
      message: 212,
      transfer: 23,
      view: 144,
      like: {
        number: 212,
        userClick: false,
      },
    },
    {
      id: "11",
      userName: "1111",
      userSerialNumber: "@11",
      postingTime: "",
      text: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Enim culpa et adipisci voluptas, quod, doloremque asperiores modi, voluptates sequi repellat architecto incidunt nihil placeat atque. Deleniti voluptas quod hic suscipit!",
      image: "",
      message: 212,
      transfer: 23,
      view: 144,
      like: {
        number: 212,
        userClick: false,
      },
    },
  ],
};

export const otherUserDataSlice = createSlice({
  name: "otherUserData",
  initialState,
  reducers: {
    otherUserDataChange: (state, { payload }) => {
      state.otherUserData = payload;
    },
    addArticle: (state, { payload }: PayloadAction<otherUserDataProps>) => {
      state.otherUserData = [...state.otherUserData, payload];
    },
    AddOtherUserDataLike: (state, { payload }: PayloadAction<string>) => {
      // eslint-disable-next-line array-callback-return
      state.otherUserData.map((item) => {
        if (item.id === payload) {
          if (item.like.userClick) {
            item.like.userClick = false;
            item.like.number -= 1;
          } else {
            item.like.userClick = true;
            item.like.number += 1;
          }
        }
      });
    },
  },
});

export const { otherUserDataChange, addArticle, AddOtherUserDataLike } =
  otherUserDataSlice.actions;

const otherUserDataSliceReducer = otherUserDataSlice.reducer;

export default otherUserDataSliceReducer;
