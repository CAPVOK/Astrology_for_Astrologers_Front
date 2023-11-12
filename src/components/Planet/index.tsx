import "./Planet.css";
import { FC } from "react";
import { IPlanetProps } from "./typing";

export const Planet: FC<IPlanetProps> = (props) => {
  const { color1, color2 } = props;

  return (
    <div className="planet">
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
  );
};
