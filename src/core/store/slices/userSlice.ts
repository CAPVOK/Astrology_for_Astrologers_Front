import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface IUser {
  userName: string;
  isAuth: boolean;
  loginMessage: string;
  constellation: string;
}

const initialState: IUser = {
  userName: "",
  isAuth: false,
  loginMessage: "",
  constellation: "",
};

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
      state.constellation = "";
    },
    saveConstellation: (state, action: PayloadAction<string>) => {
      state.constellation = action.payload;
    },
    saveLoginMessage: (state, action: PayloadAction<string>) => {
      state.loginMessage = action.payload;
    },
  },
});

export const { saveUser, logoutUser, saveLoginMessage, saveConstellation } =
  userSlice.actions;
