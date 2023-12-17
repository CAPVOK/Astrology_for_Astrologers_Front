import { RootState } from "..";

export const selectUser = (state: RootState) => state.user;
export const selectLoginMessage = (state: RootState) => state.user.loginMessage;
