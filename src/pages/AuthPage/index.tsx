import { FC } from "react";
import { IAuthPageProps } from "./typing";
import { Navigate } from "react-router-dom";

export const AuthPage: FC<IAuthPageProps> = (props) => {
  const { setIsLogin, isLogin } = props;

  if (isLogin)
    return <Navigate to={"/"} />;

  return (
    <div>
      AuthPage
      <button onClick={() => setIsLogin(true)}>LOGIN</button>
    </div>
  );
};
