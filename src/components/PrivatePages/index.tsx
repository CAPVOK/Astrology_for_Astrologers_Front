import { FC } from "react";
import { Outlet } from "react-router-dom";
import { IPrivatePagesProps } from "./typing";

export const PrivatePages: FC<IPrivatePagesProps> = () => {
/* 
  const location = useLocation();
  console.log(location);
  console.log(isLogin); */

  return <Outlet />;
};
