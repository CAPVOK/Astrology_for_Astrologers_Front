import { Location } from "react-router-dom";

export interface ICrumb {
  label: string;
  path: string;
}

export interface IBreadcrumps {
  location: Location;
  crumbs: ICrumb[]
  isCrumbs?: boolean;
  isCloseButton?: boolean;
  isFixed?: boolean;
  isAbsolute?: boolean;
  isBlur?: boolean;
}
