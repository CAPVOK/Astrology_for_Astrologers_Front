import "./AuthPage.css";
import { FC } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { selectUser } from "../../core/store/slices/selectors";
import { useSelector } from "react-redux";
import { LogInForm } from "../../components/LogInForm";
import { BreadCrumbs } from "../../components";
import { ROUTES } from "../../App.constants";

export const RegisterPage: FC = () => {
  const { isAuth } = useSelector(selectUser);

  const location = useLocation();
  const navigate = useNavigate();

  if (isAuth)
    return <Navigate to={location.state?.from || ROUTES.HOME} replace={true} />;

  return (
    <div className="auth_page">
      <BreadCrumbs
        location={location}
        crumbs={[{ label: "Регистрация", path: "" }]}
        isAbsolute={true}
        isCloseButton={false}
      />
      <div className="auth_page-mode_block">
        <button
          onClick={() => navigate(ROUTES.LOGIN)}
          className={"auth_page-mode_block-item"}
        >
          Войти
        </button>
        <button className={"auth_page-mode_block-item active"}>
          Зарегистрироваться
        </button>
        <div className={"auth_page-mode_block-slider right"} />
      </div>
      <LogInForm isLoginPage={false} />
    </div>
  );
};
