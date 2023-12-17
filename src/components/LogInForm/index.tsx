import { FC, useEffect, useState } from "react";
import "./LoginForm.css";
import { ChangeEvent } from "../../App.typing";
import { loginUser, registerUser } from "../../core/api/auth";
import { IUserAuthData } from "../../core/api/auth/typing";
import { useDispatch, useSelector } from "../../core/store";
import { selectLoginMessage } from "../../core/store/slices/selectors";
import { saveLoginMessage } from "../../core/store/slices/userSlice";

interface ILogInFormProps {
  isLoginPage: boolean;
}

export const LogInForm: FC<ILogInFormProps> = (props) => {
  const { isLoginPage } = props;
  const dispatch = useDispatch();

  const [formData, setFormData] = useState<IUserAuthData>({
    login: "",
    password: "",
  });
  const message = useSelector(selectLoginMessage);
  const [isSendActive, setSendActive] = useState(false);

  function handleChange(event: ChangeEvent) {
    const { id, value } = event.target;
    setFormData((prevState) => ({ ...prevState, [id]: value }));
    dispatch(saveLoginMessage(""));
  }

  function clickSignUp() {
    console.log("click");
    if (formData.password && formData.login) {
      if (isLoginPage) {
        loginUser(formData);
      } else {
        registerUser(formData);
      }
    } else dispatch(saveLoginMessage("Введите все данные"));
  }

  useEffect(() => {
    dispatch(saveLoginMessage(""));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoginPage]);

  useEffect(() => {
    if (formData.login && formData.password && !message) {
      setSendActive(true);
    } else {
      setSendActive(false);
    }
  }, [formData, message]);

  return (
    <div className="login_form">
      <label htmlFor="login">Логин</label>
      <input
        type="text"
        placeholder="capvok"
        id="login"
        value={formData.login}
        onChange={handleChange}
      />

      <label htmlFor="password">Пароль</label>
      <input
        type="password"
        placeholder="123123"
        id="password"
        value={formData.password}
        onChange={handleChange}
      />

      <button onClick={clickSignUp}>
        <p
          className={
            isSendActive ? "login_form-send active" : "login_form-send"
          }
        >
          {isLoginPage ? "Войти" : "Зарегистрироваться"}
        </p>
      </button>
      <p className="login_form-message">{message}</p>
    </div>
  );
};
