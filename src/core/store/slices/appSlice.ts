import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";

export interface IAppData {
  searchName: string;
  startFormationDate: string;
  searchStatus: string;
  endFromationDate: string;
  notifications: INotification[];
}

export interface INotification {
  id: string;
  message: string;
  isError: boolean;
}

const initialState: IAppData = {
  searchName: "",
  startFormationDate: "",
  endFromationDate: "",
  searchStatus: "",
  notifications: [],
};

export const appSlice = createSlice({
  name: "userSlice",
  initialState,
  reducers: {
    refreshApp: (state) => {
      state.searchName = "";
      state.notifications = [];
      state.startFormationDate = "";
      state.endFromationDate = "";
      state.searchStatus = "";
    },
    saveSearchName: (state, action: PayloadAction<string>) => {
      state.searchName = action.payload;
    },
    saveConstellationParams: (
      state,
      action: PayloadAction<{
        startFormationDate: string;
        endFormationDate: string;
        searchStatus: string;
      }>
    ) => {
      state.startFormationDate = action.payload.startFormationDate;
      state.endFromationDate = action.payload.endFormationDate;
      state.searchStatus = action.payload.searchStatus;
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
  saveSearchName,
  addNotification,
  saveConstellationParams,
  deleteNotification,
  refreshApp,
} = appSlice.actions;
