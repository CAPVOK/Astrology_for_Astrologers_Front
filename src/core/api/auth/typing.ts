export interface IUserLoginData {
  email: string;
  password: string;
}

export interface IUserRegisterData {
  email: string;
  password: string;
  fullName: string;
}

export enum ROLE {
  GUEST = "гость",
  USER = "пользователь",
  MODERATOR = "модератор"
}

export interface IUserLoginResponseData {
  accessToken: string;
  fullName: string;
  role: ROLE;
}

export interface IUserLogoutResponseData {
  message: string;
}

export interface IUserErrorResponseData {
  error: string;
}