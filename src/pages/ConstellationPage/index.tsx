import { FC } from "react";
import { useLocation } from "react-router-dom";
import { Breadcrumps } from "../../components";

export const ConstellationPage: FC = () => {
  const location = useLocation();
  console.log(location);

  return (
    <div className="constellation_page">
      <Breadcrumps location={location} name="Созвездие"/>
      <div>ConstellationPage</div>
    </div>
  );
};
