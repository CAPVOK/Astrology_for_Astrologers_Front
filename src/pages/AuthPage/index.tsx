import { FC } from "react";
import { IAuthPageProps } from "./typing";
import { Navigate } from "react-router-dom";

export const AuthPage: FC<IAuthPageProps> = (props) => {
  const { login, isLogin } = props;
  /* 
  const location = useLocation();
  console.log(location); */

  if (isLogin) return <Navigate to={"/"} replace={true} />;

  return (
    <div>
      AuthPage
      <button onClick={login}>LOGIN</button>
    </div>
  );
};
