import { isAxiosError } from "axios";
import { store } from "../store";
import { addNotification } from "../store/slices/appSlice";
import { ACCESS_TOKEN_NAME } from "../../env";

export const handleError = (error: unknown): never => {
  if (isAxiosError(error)) {
    store.dispatch(
      addNotification({
        message: error.response?.data.error || error.message,
        isError: true,
      })
    );
    console.error("Axios error: ", error.response?.data.error || error.message);
  } else {
    console.error("Unexpected error: ", error);
  }
  throw error;
};

export const getToken = () => {
  const localToken = localStorage.getItem(ACCESS_TOKEN_NAME);
  return localToken || "";
};

