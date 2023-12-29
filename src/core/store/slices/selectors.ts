import { RootState } from "..";

export const selectUser = (state: RootState) => state.user;

export const selectApp = (state: RootState) => state.app;
