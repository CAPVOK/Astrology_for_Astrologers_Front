import "./AuthPage.css";
import { FC, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { selectUser } from "../../core/store/slices/selectors";
import { useSelector } from "react-redux";
import { LogInForm } from "../../components/LogInForm";
import { BreadCrumbs } from "../../components";

export const AuthPage: FC = () => {
  const { isAuth } = useSelector(selectUser);
  const [isLoginPage, setIsLoginPage] = useState(true);

  const location = useLocation();

  const handleChangeAuthModeClick = () => {
    setIsLoginPage(!isLoginPage);
  };

  if (isAuth)
    return <Navigate to={location.state?.from || "/"} replace={true} />;

  return (
    <div className="auth_page">
      <BreadCrumbs
        location={location}
        crumbs={[{ label: "Авторизация", path: "" }]}
        isAbsolute={true}
        isCloseButton={false}
      />
      <div className="auth_page-mode_block">
        <button
          onClick={handleChangeAuthModeClick}
          className={
            !isLoginPage
              ? "auth_page-mode_block-item"
              : "auth_page-mode_block-item active"
          }
          disabled={isLoginPage}
        >
          Войти
        </button>
        <button
          onClick={handleChangeAuthModeClick}
          className={
            isLoginPage
              ? "auth_page-mode_block-item"
              : "auth_page-mode_block-item active"
          }
          disabled={!isLoginPage}
        >
          Зарегистрироваться
        </button>
        <div
          className={
            isLoginPage
              ? "auth_page-mode_block-slider"
              : "auth_page-mode_block-slider right"
          }
        />
      </div>
      <LogInForm isLoginPage={isLoginPage} />
    </div>
  );
};
