import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface IUser {
  userName: string;
  isAuth: boolean;
  constellationId: string;
}

const initialState: IUser = {
  userName: "",
  isAuth: false,
  constellationId: "",
};

export const userSlice = createSlice({
  name: "userSlice",
  initialState,
  reducers: {
    refreshUser: (state) => {
      state.isAuth = false;
      state.constellationId = "";
      state.userName = "";
    },
    saveUser: (state, action: PayloadAction<string>) => {
      state.userName = action.payload;
      state.isAuth = true;
    },
    saveAuth: (state, action: PayloadAction<boolean>) => {
      state.isAuth = action.payload;
    },
    logoutUser: (state) => {
      state.userName = "";
      state.isAuth = false;
      state.constellationId = "";
    },
    saveConstellation: (state, action: PayloadAction<string>) => {
      state.constellationId = action.payload;
    },
  },
});

export const {
  saveUser,
  logoutUser,
  saveConstellation,
  saveAuth,
  refreshUser,
} = userSlice.actions;
