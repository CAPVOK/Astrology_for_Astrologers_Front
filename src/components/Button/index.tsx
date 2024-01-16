import "./Button.css";
import { FC } from "react";

export interface IButtonProps {
  label: string;
  isLoading?: boolean;
  handler?: () => void;
  style?: "info" | "error" | "accent" | "success";
  isFullWidth?: boolean;
}

export const Button: FC<IButtonProps> = (props) => {
  const { label, isLoading, style = "accent", handler, isFullWidth } = props;
  const getBorderColor = () => {
    switch (style) {
      case "info":
        return " #006eff";
      case "error":
        return "#e80909";
      case "success":
        return "#4eff26";
      default:
        return "#FB2576";
    }
  };
  return (
    <button
      style={{
        borderColor: isLoading ? "#858585" : getBorderColor(),
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
