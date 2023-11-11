import "./PlanetCatd.css";
import { FC } from "react";
import { IPlanetCardProps } from "./typing";
import { Link } from "react-router-dom";

export const PlanetCard: FC<IPlanetCardProps> = (props) => {
  const { id, color1, color2, name } = props;

  return (
    <Link to={"/planet/" + id} className="card" state={{from: name}}>
      <div className="planet" id={name}>
        <div className="circle" style={{ backgroundColor: color1 }}>
          <div className="color_blocks">
            <div className="block" style={{ backgroundColor: color2 }}></div>
            <div className="deep">
              <div
                className="mini_circle"
                style={{ backgroundColor: color1 }}
              ></div>
            </div>
            <div className="block" style={{ backgroundColor: color2 }}></div>
            <div className="deep">
              <div
                className="mini_circle"
                style={{ backgroundColor: color1 }}
              ></div>
            </div>
            <div className="block" style={{ backgroundColor: color2 }}></div>
            <div className="deep">
              <div
                className="mini_circle"
                style={{ backgroundColor: color1 }}
              ></div>
            </div>
            <div className="block" style={{ backgroundColor: color2 }}></div>
            <div className="deep">
              <div
                className="mini_circle"
                style={{ backgroundColor: color1 }}
              ></div>
            </div>
            <div className="block" style={{ backgroundColor: color2 }}></div>
          </div>
        </div>
      </div>
      <div className="content">
        <h3>{name}</h3>
      </div>
    </Link>
  );
};
