import axios, { isAxiosError } from "axios";
import { responseBody } from "..";
import { IGetPlanetByIdResponse, IGetPlanetsResponse } from "./typing";
import { IMessage } from "../constellations/typing";

export const planetApi = axios.create({
  baseURL: "/api/planet/",
  headers: { "Content-Type": "application/json", Accept: "application/json" },
});

planetApi.interceptors.response.use(
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

export const getPlanets = async (serachName?: string) => {
  try {
    const response: IGetPlanetsResponse = responseBody(
      await planetApi.get("/", {
        params: serachName ? { searchByName: serachName } : undefined,
      })
    );
    console.log("core planets", response);
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

export const getPlanetById = async (id: string) => {
  try {
    const response: IGetPlanetByIdResponse = responseBody(
      await planetApi.get(`/${id}`)
    );
    console.log("core planet by id", response);
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

export const addPlanetById = async (id: string) => {
  try {
    const response: IMessage = responseBody(await planetApi.post(`/${id}`));
    console.log("core add planet by id");
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
