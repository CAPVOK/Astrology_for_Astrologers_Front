import axios, { AxiosResponse } from "axios";

export const guestApi = axios.create({
  baseURL: "http://localhost:8080/",
  headers: { "Content-Type": "application/json", Accept: "application/json" },
});

export const clientApi = axios.create({
  baseURL: "http://localhost:8080/",
  headers: { "Content-Type": "application/json", Accept: "application/json" },
});

export const responseBody = (response: AxiosResponse) => response.data;
