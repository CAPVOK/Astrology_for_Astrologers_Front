/* eslint-disable @typescript-eslint/no-unused-vars */
import axios, { isAxiosError } from "axios";
import { responseBody } from "..";
import { IUserAuthData } from "./typing";
import { store } from "../../store";
import { refreshApp } from "../../store/slices/appSlice";
import * as bcrypt from "bcryptjs";
import { refreshUser } from "../../store/slices/userSlice";
import {} from "react-cookie";

const authApi = axios.create({
  baseURL: "/api/auth",
  headers: { "Content-Type": "application/json", Accept: "application/json" },
});

authApi.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    /* if (error.response && error.response.status === 401) {
      logout();
    } */
    return Promise.reject(error);
  }
);

const hashPassword = async (password: string): Promise<number[]> => {
  const saltRounds = 5; // уровень сложности хэширования
  const hashedPassword = await bcrypt.hash(password, saltRounds);

  const passwordArray = hashedPassword
    .split("")
    .map((char) => char.charCodeAt(0));

  return passwordArray;
};

export const loginUser = async (userData: IUserAuthData) => {
  try {
    const hashedPassword = await hashPassword(userData.password);
    const { id }: { id: number } = responseBody(
      await authApi.post("/login", {
        ...userData,
        password: hashedPassword,
      })
    );
    return id;
  } catch (error) {
    if (isAxiosError(error)) {
      console.log(
        "error message: ",
        error.response?.data.message || error.message
      );
      throw error.response?.data.message || error.message;
    } else {
      console.log("unexpected error: ", error);
    }
  }
};

export const registerUser = async (userData: IUserAuthData) => {
  try {
    const hashedPassword = await hashPassword(userData.password);
    const { id }: { id: number } = responseBody(
      await authApi.post("/register", {
        ...userData,
        password: hashedPassword,
      })
    );
    return id;
  } catch (error) {
    if (isAxiosError(error)) {
      console.log("error message: ", error.message);
      throw error.response?.data.message || error.message;
    } else {
      console.log("unexpected error: ", error);
    }
  }
};

export const logout = async () => {
  try {
    await authApi.post("/logout");
    store.dispatch(refreshApp());
    store.dispatch(refreshUser());
  } catch (error) {
    if (isAxiosError(error)) {
      console.log("error message: ", error.message);
      throw error.response?.data.message || error.message;
    } else {
      console.log("unexpected error: ", error);
    }
  }
};
