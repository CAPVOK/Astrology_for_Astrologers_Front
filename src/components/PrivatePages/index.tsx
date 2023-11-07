import { FC } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { IPrivatePagesProps } from "./typing";

export const PrivatePages: FC<IPrivatePagesProps> = (props) => {
  const { isLogin } = props;

  if (!isLogin) return <Navigate to="/auth" />;

  return <Outlet />;
};
