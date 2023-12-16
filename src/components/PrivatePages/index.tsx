import { FC } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { IPrivatePagesProps } from "./typing";
import { useSelector } from "../../core/store";
import { selectUser } from "../../core/store/slices/selectors";

export const PrivatePages: FC<IPrivatePagesProps> = (props) => {
  const { children } = props;

  const { isAuth } = useSelector(selectUser);

  if (!isAuth)
    return (
      <Navigate
        to="/auth"
        /* state={{ from: location.pathname, prev: location.state?.from?.pathname }} */
        replace
      />
    );

  return children ? children : <Outlet />;
};
