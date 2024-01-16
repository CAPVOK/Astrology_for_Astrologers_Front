import axios from "axios";
import { store } from "../../store";
import { ACCESS_TOKEN_NAME, USER_NAME, USER_ROLE } from "../../../env";
import { refreshApp } from "../../store/slices/appSlice";
import { refreshUser } from "../../store/slices/userSlice";
import {
  CONST_STATUS,
  IConstellation,
  IGetConstellationByIdResponse,
  IGetConstellationsParams,
  IGetConstellationsResponse,
  IUpdateConstellationFormProps,
} from "./typing";
import { getToken, handleError } from "..";

export const stellaApi = axios.create({
  baseURL: "/api/constellation/",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
    Authorization: getToken(),
  },
});

stellaApi.interceptors.request.use(
  (response) => {
    response.headers.setAuthorization(getToken());
    return response;
  },
  (error) => {
    return Promise.reject(error);
  }
);

stellaApi.interceptors.response.use(
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

export const getConstellations = async (parapms?: IGetConstellationsParams) => {
  try {
    const response = await stellaApi.get<IGetConstellationsResponse>("/", {
      params: parapms ? { ...parapms } : undefined,
    });
    console.log("core getConstellations", response.data);
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

export const getConstellationById = async (id: number | string) => {
  try {
    const response = await stellaApi.get<IGetConstellationByIdResponse>(
      `/${id}`
    );
    console.log("core getConstellationById", response.data);
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

export const deleteConstellationById = async (id: number | string) => {
  try {
    const response = await stellaApi.delete<IConstellation[]>(`/${id}`);
    console.log("core deleteConstellationById", response.data);
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

export const updateConstellationById = async (
  id: number | string,
  body: IUpdateConstellationFormProps
) => {
  try {
    const response = await stellaApi.put<IGetConstellationByIdResponse>(
      `/${id}/update`,
      body
    );
    console.log("core updateConstellationById", response.data);
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

export const statusConstellationById = async (
  id: number | string,
  status: CONST_STATUS
) => {
  try {
    const response = await stellaApi.put<IGetConstellationByIdResponse>(
      `/${id}/status`,
      { constellationStatus: status }
    );
    console.log("core updateConstellationById", response.data);
    return response.data;
  } catch (error) {
    handleError(error);
  }
};
