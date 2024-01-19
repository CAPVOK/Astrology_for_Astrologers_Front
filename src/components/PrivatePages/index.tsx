/* eslint-disable @typescript-eslint/no-unused-vars */
import { FC } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { IPrivatePagesProps } from "./typing";
import { useSelector } from "../../core/store";
import { selectUser } from "../../core/store/slices/selectors";
import { ROUTES } from "../../App.constants";

export const PrivatePages: FC<IPrivatePagesProps> = (props) => {
  const { children } = props;

  const { isAuth } = useSelector(selectUser);

  const location = useLocation();

  /* if (location.pathname === "/constellations" && !constellationId) {
    return <Navigate to="/" replace />;
  } */

  if (!isAuth) {
    return (
      <Navigate
        to={ROUTES.AUTH}
        state={{
          from: location.pathname,
        }}
      />
    );
  } else return children ? children : <Outlet />;
};
