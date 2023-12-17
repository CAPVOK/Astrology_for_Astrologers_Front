/* eslint-disable @typescript-eslint/no-unused-vars */
import { FC } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { IPrivatePagesProps } from "./typing";
import { useSelector } from "../../core/store";
import { selectUser } from "../../core/store/slices/selectors";

export const PrivatePages: FC<IPrivatePagesProps> = (props) => {
  const { children } = props;

  const { isAuth, constellation } = useSelector(selectUser);

  const location = useLocation();

  if (location.pathname === "/constellation" && !constellation) {
    return <Navigate to="/" replace />;
  }

  if (!isAuth) {
    return (
      <Navigate
        to="/auth"
        state={{
          from: location.pathname,
        }}
      />
    );
  } else return children ? children : <Outlet />;
};
