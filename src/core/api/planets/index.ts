import { sendRequest } from "../..";
import {  IGetPlanetByIdResponse, IGetPlanetsResponse } from "./typing";

export const getPlanets = async (serachName?: string) => {
  try {
    const response: IGetPlanetsResponse = await sendRequest({
      method: "GET",
      path: "/planet/",
      params: serachName ? { searchByName: serachName } : undefined,
    });
    return response;
  } catch (error) {
    console.error("Error fetching planets:", error);
    throw error;
  }
};

export const getPlanetById = async (id: string) => {
  try {
    const response: IGetPlanetByIdResponse = await sendRequest({
      method: "GET",
      path: `/planet/${id}`,
    });
    return response;
  } catch (error) {
    console.error("Error fetching planet:", error);
    throw error;
  }
};
