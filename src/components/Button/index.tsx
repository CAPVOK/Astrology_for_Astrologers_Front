import { COLOR_PALETE } from "../../App.constants";
import "./Button.css";
import { FC } from "react";

export interface IButtonProps {
  label: string;
  isLoading?: boolean;
  handler?: () => void;
  style?: COLOR_PALETE;
  isFullWidth?: boolean;
}

export const Button: FC<IButtonProps> = (props) => {
  const {
    label,
    isLoading,
    style = COLOR_PALETE.accent,
    handler,
    isFullWidth,
  } = props;

  return (
    <button
      style={{
        borderColor: isLoading ? COLOR_PALETE.lightGray : style,
        width: isFullWidth ? "100%" : "",
      }}
      className={isLoading ? "my_button loading" : "my_button"}
      onClick={handler}
      disabled={isLoading}
    >
      {label}
    </button>
  );
};
