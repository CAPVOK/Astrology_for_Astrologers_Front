import axios from "axios";
import { getToken, handleError } from "..";
import {
  ICreatePlanetRequest,
  IGetPlanetByIdResponse,
  IGetPlanetsResponse,
  IPlanet,
} from "./typing";
import { store } from "../../store";
import { refreshApp } from "../../store/slices/appSlice";
import { refreshUser, saveConstellationId } from "../../store/slices/userSlice";
import { ACCESS_TOKEN_NAME, USER_NAME, USER_ROLE } from "../../../env";
import { IGetConstellationByIdResponse } from "../constellations/typing";

export const planetApi = axios.create({
  baseURL: "/api/planet/",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

planetApi.interceptors.request.use(
  (response) => {
    response.headers.setAuthorization(getToken());
    return response;
  },
  (error) => {
    return Promise.reject(error);
  }
);

planetApi.interceptors.response.use(
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

export const getPlanets = async (
  page: number,
  searchName?: string,
): Promise<IGetPlanetsResponse | undefined> => {
  try {
    const response = await planetApi.get<IGetPlanetsResponse>("/", {
      params: { searchName: searchName || "", page: page },
    });
    console.log("core getPlanets", response.data);
    store.dispatch(saveConstellationId(response.data.constellationID));
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

export const getPlanetById = async (
  id: number | string
): Promise<IGetPlanetByIdResponse | undefined> => {
  try {
    const response = await planetApi.get<IGetPlanetByIdResponse>(`/${id}`);
    console.log("core getPlanetById", response.data);
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

export const updatePlanetById = async (id: number | string, body: IPlanet) => {
  try {
    const response = await planetApi.put<IGetPlanetByIdResponse>(
      `/${id}`,
      body
    );
    console.log("core updatePlanetById", response.data);
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

export const createPlanet = async (body: ICreatePlanetRequest) => {
  try {
    const response = await planetApi.post<IGetPlanetsResponse>(`/`, body);
    console.log("core createPlanet", response.data);
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

export const addPlanetPhotoById = async (
  id: number | string,
  body: unknown
) => {
  try {
    const response = await planetApi.post<IGetPlanetByIdResponse>(
      `/${id}/image`,
      body,
      {
        headers: {
          "Content-Type":
            "multipart/form-data; boundary=<calculated when request is sent>",
        },
      }
    );
    console.log("core addPlanetPhoto", response.data);
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

export const deletePlanetById = async (id: number | string) => {
  try {
    const response = await planetApi.delete<IGetPlanetsResponse>(`/${id}`);
    console.log("core deletePlanetById", response.data);
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

export const addPlanetByIdToConstellation = async (id: number | string) => {
  try {
    const response = await planetApi.post<IGetPlanetsResponse>(
      `/${id}/constellation`
    );
    console.log("core addPlanetByIdToConstellation", response.data);
    store.dispatch(saveConstellationId(response.data.constellationID));
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

export const deletePlanetByIdFromConstellation = async (
  id: number | string
) => {
  try {
    const response = await planetApi.delete<IGetConstellationByIdResponse>(
      `/${id}/constellation`
    );
    console.log("core addPlanetByIdToConstellation", response.data);
    return response.data;
  } catch (error) {
    handleError(error);
  }
};
