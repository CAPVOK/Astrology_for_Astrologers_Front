import axios, { isAxiosError } from "axios";
import { responseBody } from "..";
import {
  IGetConstellationByIdResponse,
  IGetConstellationResponse,
} from "./typing";

export const stellaApi = axios.create({
  baseURL: "/api/constellation/",
  headers: { "Content-Type": "application/json", Accept: "application/json" },
});

stellaApi.interceptors.response.use(
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

export const getConstellations = async () => {
  try {
    const response: IGetConstellationResponse = responseBody(
      await stellaApi.get("/")
    );
    console.log("core stella", response);
    return response;
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

export const getConstellationById = async (id: string) => {
  try {
    const response: IGetConstellationByIdResponse = responseBody(
      await stellaApi.get(`/${id}`)
    );
    console.log("core stella by id", response);
    return response;
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
