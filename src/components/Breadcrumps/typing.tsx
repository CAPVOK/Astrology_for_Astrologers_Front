import { Location } from "react-router-dom";

export interface IBreadcrumps {
  location: Location;
  name?: string;
  isCloseButton?: boolean;
  isFixed?: boolean;
  isAbsolute?: boolean;
  isBlur?: boolean;
}
