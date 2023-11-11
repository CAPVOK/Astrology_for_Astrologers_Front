import { useState } from "react";
import { IGlobalProps } from "../App.typing";

const AUTH_KEY = "astrology_auth_key";

export const useGlobalProps = () => {
  const currentAuth = localStorage.getItem(AUTH_KEY);

  const [isAuth, setIsAuth] = useState(!!currentAuth);

  const useAuth = () => {
    const auth = localStorage.getItem(AUTH_KEY);
    const loginStatus = !!auth;
    setIsAuth(loginStatus);
    return loginStatus;
  };

  const logout = () => {
    setIsAuth(false);
    localStorage.removeItem(AUTH_KEY);
  };

  const login = () => {
    setIsAuth(true);
    localStorage.setItem(AUTH_KEY, "true");
  };

  const globalProps: IGlobalProps = {
    isLogin: isAuth,
    logout: logout,
    login: login,
    useAuth: useAuth,
  };

  return globalProps;
};
