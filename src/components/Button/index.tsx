import "./Button.css";
import { FC } from "react";

export interface IButtonProps {
  label: string;
  isLoading?: boolean;
  handler?: () => void;
  style?: "info" | "error" | "accent";
}

export const Button: FC<IButtonProps> = (props) => {
  const { label, isLoading, style = "accent", handler } = props;
  const borderColor =
    style !== "info" ? (style === "error" ? "#e80909" : "#FB2576") : "#006eff";
  return (
    <button
      style={{ borderColor: isLoading ? "#858585" : borderColor }}
      className={isLoading ? "my_button loading" : "my_button"}
      onClick={handler}
      disabled={isLoading}
    >
      {label}
    </button>
  );
};
