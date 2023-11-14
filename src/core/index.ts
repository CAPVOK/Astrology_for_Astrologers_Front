import { IRequestOptions } from "./typing";

/* export const BASE_URL = "http://localhost:8080"; */
export const BASE_URL = "/api";

export const sendRequest = async (options: IRequestOptions) => {
  const {
    method,
    path,
    headers = {},
    params = undefined,
    data /* , isAuth = false */,
  } = options;

  /* const url = new URL(`${BASE_URL}${path}`); */
  let url = BASE_URL + path;

  /* 
  const accessToken = await getCurrentAccessToken();
  console.log("CurrentAccessToken", accessToken); */
  const requestOptions: RequestInit = {
    method,
    headers: {
      "Content-Type": "application/json",
      //Authorization: !isAuth && accessToken ? /* "Bearer " + */ accessToken : "",
      ...headers,
    },
    body: data ? JSON.stringify(data) : undefined,
  };

  if (params) {
    Object.keys(params).forEach((key) => {
      /* url.searchParams.append(key, params[key]); */
      url = url + "?" + key + "=" + params[key];
    });
  }

  const response = await fetch(url/* .toString() */, requestOptions);

  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }

  return response.json();
};
