import { FC } from "react";
import { Navigate } from "react-router-dom";
import { store, useSelector } from "../../core/store";
import { selectUser } from "../../core/store/slices/selectors";
import { saveUser } from "../../core/store/slices/userSlice";

export const AuthPage: FC = () => {
  const { isAuth } = useSelector(selectUser);

  if (isAuth) return <Navigate to={"/"} replace={true} />;

  return (
    <div>
      AuthPage
      <button onClick={() => store.dispatch(saveUser("Arina"))}>LOGIN</button>
    </div>
  );
};
