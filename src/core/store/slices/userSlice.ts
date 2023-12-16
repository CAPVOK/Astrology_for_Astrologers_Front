import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface IUser {
  userName: string;
  isAuth: boolean;
}

const initialState: IUser = { userName: "", isAuth: false };

export const userSlice = createSlice({
  name: "userSlice",
  initialState,
  reducers: {
    saveUser: (state, action: PayloadAction<string>) => {
      state.userName = action.payload;
      state.isAuth = true;
    },
    logoutUser: (state) => {
      state.userName = "";
      state.isAuth = false;
    },
  },
});

export const { saveUser, logoutUser } = userSlice.actions;
