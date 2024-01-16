/* eslint-disable @typescript-eslint/no-unused-vars */
import axios from "axios";
import { getToken, handleError } from "..";
import { store } from "../../store";
import { addNotification, refreshApp } from "../../store/slices/appSlice";
import { refreshUser, saveUser } from "../../store/slices/userSlice";
import {} from "react-cookie";
import {
  IUserLoginData,
  IUserLoginResponseData,
  IUserRegisterData,
} from "./typing";
import { ACCESS_TOKEN_NAME, USER_NAME, USER_ROLE } from "../../../env";

const authApi = axios.create({
  baseURL: "/api/user",
  headers: { "Content-Type": "application/json", Accept: "application/json" },
});

authApi.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response && error.response.status === 401) {
      store.dispatch(refreshApp());
      store.dispatch(refreshUser());
      localStorage.removeItem(ACCESS_TOKEN_NAME);
      localStorage.removeItem(USER_ROLE);
      localStorage.removeItem(USER_NAME);
    }
    return Promise.reject(error);
  }
);

export const loginUser = async (userData: IUserLoginData) => {
  try {
    const response = await authApi.post<IUserLoginResponseData>(
      "/login",
      userData
    );
    const user = response.data;
    console.log("core loginUser", user);
    store.dispatch(
      saveUser({
        userName: user.fullName,
        isAuth: true,
        role: user.role,
        constellationId: 0,
      })
    );
    localStorage.setItem(ACCESS_TOKEN_NAME, user.accessToken);
    localStorage.setItem(USER_ROLE, user.role);
    localStorage.setItem(USER_NAME, user.fullName);
    return user;
  } catch (error) {
    handleError(error);
  }
};

export const registerUser = async (userData: IUserRegisterData) => {
  try {
    const response = await authApi.post<IUserLoginResponseData>(
      "/register",
      userData
    );
    const user = response.data;
    console.log("core registerUser", user);
    store.dispatch(
      saveUser({
        userName: user.fullName,
        isAuth: true,
        role: user.role,
        constellationId: 0,
      })
    );
    store.dispatch(
      addNotification({
        message: "Вы успешно зарегистрировались",
      })
    );
    localStorage.setItem(ACCESS_TOKEN_NAME, user.accessToken);
    localStorage.setItem(USER_ROLE, user.role);
    localStorage.setItem(USER_NAME, user.fullName);
    return user;
  } catch (error) {
    handleError(error);
  }
};

export const logout = async () => {
  try {
    const token = localStorage.getItem(ACCESS_TOKEN_NAME);
    store.dispatch(refreshApp());
    store.dispatch(refreshUser());
    localStorage.removeItem(ACCESS_TOKEN_NAME);
    localStorage.removeItem(USER_ROLE);
    localStorage.removeItem(USER_NAME);
    const response = await authApi.post<IUserLoginResponseData>(
      "/logout",
      null,
      {
        headers: { Authorization: token },
      }
    );
    const user = response.data;
    store.dispatch(
      addNotification({
        message: "Вы успешно вышли из системы",
      })
    );
    console.log("core logout", user);
    return user;
  } catch (error) {
    handleError(error);
  }
};
