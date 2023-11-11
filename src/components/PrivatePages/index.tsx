import { FC } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { IPrivatePagesProps } from "./typing";

export const PrivatePages: FC<IPrivatePagesProps> = (props) => {
  const { isLogin, children } = props;
/* 
  const location = useLocation();
  console.log(location);
  console.log(isLogin); */

  if (!isLogin)
    return (
      <Navigate
        to="/auth"
        /* state={{ from: location.pathname, prev: location.state?.from?.pathname }} */
        replace
      />
    );

  return children ? children : <Outlet />;
};
