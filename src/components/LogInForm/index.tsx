import { FC, useEffect, useState } from "react";
import "./LoginForm.css";
import { ChangeEvent } from "../../App.typing";
import { loginUser, registerUser } from "../../core/api/auth";
import { IUserRegisterData } from "../../core/api/auth/typing";
import { Loader } from "..";

interface ILogInFormProps {
  isLoginPage: boolean;
}

export const LogInForm: FC<ILogInFormProps> = (props) => {
  const { isLoginPage } = props;

  const [registerFormData, setRegisterFormData] = useState<IUserRegisterData>({
    email: "",
    password: "",
    fullName: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isSendActive, setSendActive] = useState(false);

  function handleChange(event: ChangeEvent) {
    const { id, value } = event.target;
    setRegisterFormData((prevState) => ({ ...prevState, [id]: value }));
  }

  function clickSignUp() {
    if (isLoginPage) {
      if (registerFormData.email && registerFormData.password) {
        setIsLoading(true);
        loginUser(registerFormData)
          .then(() => setIsLoading(false))
          .catch(() => setIsLoading(false));
        return;
      }
    } else {
      if (
        registerFormData.email &&
        registerFormData.fullName &&
        registerFormData.password
      ) {
        setIsLoading(true);
        registerUser(registerFormData)
          .then(() => setIsLoading(false))
          .catch(() => setIsLoading(false));
        return;
      }
    }
  }

  useEffect(() => {
    if (isLoginPage) {
      if (registerFormData.email && registerFormData.password ) {
        setSendActive(true);
      } else {
        setSendActive(false);
      }
    } else {
      if (
        registerFormData.email &&
        registerFormData.fullName &&
        registerFormData.password
      ) {
        setSendActive(true);
      } else {
        setSendActive(false);
      }
    }
  }, [registerFormData, isLoginPage]);

  return (
    <div className="login_form">
      <label htmlFor="login">Логин</label>
      <input
        type="text"
        placeholder="capvok"
        id="email"
        value={registerFormData.email}
        onChange={handleChange}
      />

      <label htmlFor="password">Пароль</label>
      <input
        type="password"
        placeholder="123123"
        id="password"
        value={registerFormData.password}
        onChange={handleChange}
      />

      {!isLoginPage && (
        <>
          <label htmlFor="password">Имя</label>
          <input
            type="fullName"
            placeholder="Владимир"
            id="fullName"
            value={registerFormData.fullName}
            onChange={handleChange}
          />
        </>
      )}
      <div className="button_block">
        {isLoading ? (
          <Loader />
        ) : (
          <button onClick={clickSignUp} disabled={isLoading}>
            <p
              className={
                isSendActive ? "login_form-send active" : "login_form-send"
              }
            >
              {isLoginPage ? "Войти" : "Зарегистрироваться"}
            </p>
          </button>
        )}
      </div>
    </div>
  );
};
