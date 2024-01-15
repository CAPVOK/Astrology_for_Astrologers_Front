import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface IUser {
  userName: string;
  isAuth: boolean;
  role: string;
  constellationId: number;
}

const initialState: IUser = {
  isAuth: false,
  userName: "",
  constellationId: 0,
  role: "",
};

export const userSlice = createSlice({
  name: "userSlice",
  initialState,
  reducers: {
    refreshUser: (state) => {
      state.isAuth = false;
      state.constellationId = 0;
      state.userName = "";
      state.role = "";
    },
    saveUser: (state, action: PayloadAction<IUser>) => {
      state.userName = action.payload.userName;
      state.isAuth = action.payload.isAuth;
      state.role = action.payload.role;
      state.constellationId = action.payload.constellationId;
    },
    saveConstellationId: (state, action: PayloadAction<number>) => {
      state.constellationId = action.payload;
    },
  },
});

export const { saveUser, refreshUser, saveConstellationId } = userSlice.actions;
