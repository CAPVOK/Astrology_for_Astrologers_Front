import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";

export interface IAppData {
  searchName: string;
  loginMessage: string;
  notifications: INotification[];
}

export interface INotification {
  id: string;
  message: string;
  isError: boolean;
}

const initialState: IAppData = {
  searchName: "",
  loginMessage: "",
  notifications: [],
};

export const appSlice = createSlice({
  name: "userSlice",
  initialState,
  reducers: {
    refreshApp: (state) => {
      state.searchName = "";
      state.loginMessage = "";
      state.notifications = [];
    },
    saveSearchName: (state, action: PayloadAction<string>) => {
      state.searchName = action.payload;
    },
    saveLoginMessage: (state, action: PayloadAction<string>) => {
      state.loginMessage = action.payload;
    },
    addNotification: (
      state,
      action: PayloadAction<{ message: string; isError?: boolean }>
    ) => {
      state.notifications.push({
        message: action.payload.message,
        id: uuidv4(),
        isError: action.payload.isError || false,
      });
    },
    deleteNotification: (state, action: PayloadAction<string>) => {
      const id = action.payload;
      const queue = state.notifications;
      const new_queue = queue.filter((item) => item.id !== id);
      state.notifications = new_queue;
    },
  },
});

export const {
  saveLoginMessage,
  saveSearchName,
  addNotification,
  deleteNotification,
  refreshApp,
} = appSlice.actions;
