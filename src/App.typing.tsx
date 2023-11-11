export interface IGlobalProps {
  isLogin: boolean;
  logout: () => void;
  login: () => void;
  useAuth: () => boolean;
}

/* export type IconType = SVGProps<SVGSVGElement>; */

export type ChangeEvent = React.ChangeEvent<HTMLInputElement>;

export type ClickEvent = React.MouseEvent<HTMLButtonElement>;
