import { IGlobalProps } from "../App.typing";

export const useGlobalProps = () => {


  const useAuth = () => {
    return true;
  };

  const logout = () => {
  };

  const login = () => {
  };

  const globalProps: IGlobalProps = {
    isLogin: true,
    logout: logout,
    login: login,
    useAuth: useAuth,
  };

  return globalProps;
};
