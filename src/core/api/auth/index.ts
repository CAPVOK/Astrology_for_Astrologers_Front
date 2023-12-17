import { isAxiosError } from "axios";
import { guestApi, responseBody } from "..";
import { IUserAuthData } from "./typing";
import { store } from "../../store";
import { saveLoginMessage, saveUser } from "../../store/slices/userSlice";

export const loginUser = async (userData: IUserAuthData) => {
  try {
    const userName: string = responseBody(
      await guestApi.post("/login", userData)
    );
    store.dispatch(saveUser(userName));
  } catch (error) {
    if (isAxiosError(error)) {
      console.log("error message: ", error.message);
      store.dispatch(saveLoginMessage(error.message));
      store.dispatch(saveUser("Владимир")); //sfl;rl;bmdlm
    } else {
      console.log("unexpected error: ", error);
    }
  }
};

export const registerUser = async (userData: IUserAuthData) => {
  try {
    const token: string = responseBody(
      await guestApi.post("/register", userData)
    );
    store.dispatch(saveUser(token));
  } catch (error) {
    if (isAxiosError(error)) {
      console.log("error message: ", error.message);
      store.dispatch(saveLoginMessage(error.message));
    } else {
      console.log("unexpected error: ", error);
    }
  }
};
