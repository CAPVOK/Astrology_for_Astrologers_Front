import { IRequestOptions } from "./typing";

export const BASE_URL = "http://localhost:8080";

export const sendRequest = async (options: IRequestOptions) => {
  const { method, path, headers = {}, data /* , isAuth = false */ } = options;
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

  try {
    const response = await fetch(`${BASE_URL}${path}`, requestOptions);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return response.json();
  } catch (error) {
    throw error;
  }
};
