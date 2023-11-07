import { useEffect, useState } from "react";
import { IGlobalProps } from "../App.typing";

export const useGlobalProps = () => {
  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {
    const auth = localStorage.getItem("auth");
    setIsAuth(auth ? true : false);
  }, []);

  const getIsLoggin = () => {
    const auth = localStorage.getItem("auth");
    setIsAuth(auth ? true : false);
    return auth ? true : false
  }

  const setIsLogin = (state: boolean) => {
    setIsAuth(state);
    localStorage.setItem("auth", state ? "true" : "");
  };

  const globalProps: IGlobalProps = {
    isLogin: isAuth,
    setIsLogin: setIsLogin,
    getIsLoggin: getIsLoggin,
  };

  return globalProps;
};
