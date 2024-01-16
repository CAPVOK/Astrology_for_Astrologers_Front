import { FC } from "react";
import { IIconProps } from "./typing";

export const ConstellationIcon: FC<IIconProps> = (props) => {
  const { fill, width, height } = props;
  return (
    <svg
      fill={fill || "#000000"}
      height={width || "20px"}
      width={height || "20px"}
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      viewBox="0 0 32 32"
      xmlSpace="preserve"
    >
      <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
      <g
        id="SVGRepo_tracerCarrier"
        strokeLinecap="round"
        strokeLinejoin="round"
      ></g>
      <g id="SVGRepo_iconCarrier">
        <g>
          <path d="M16,12c-2.2,0-4,1.8-4,4s1.8,4,4,4s4-1.8,4-4S18.2,12,16,12z"></path>
          <path d="M16,7c-5,0-9,4-9,9c0,3.5,2,6.5,5,8c0,1.6,1.4,3,3,3c1.4,0,2.5-0.9,2.9-2.2C22,23.9,25,20.3,25,16C25,11,21,7,16,7z M17.7,22.8c-0.5-1-1.5-1.8-2.7-1.8c-0.9,0-1.8,0.5-2.3,1.1C10.4,20.9,9,18.6,9,16c0-3.9,3.1-7,7-7s7,3.1,7,7 C23,19.2,20.8,22,17.7,22.8z"></path>
          <path d="M27.7,8.3C27.9,7.9,28,7.5,28,7c0-1.7-1.3-3-3-3c-0.5,0-0.9,0.1-1.3,0.3C21.4,2.8,18.8,2,16,2C8.3,2,2,8.3,2,16 s6.3,14,14,14s14-6.3,14-14C30,13.2,29.2,10.6,27.7,8.3z M16,28C9.4,28,4,22.6,4,16S9.4,4,16,4c2.2,0,4.4,0.6,6.3,1.8 C22.1,6.1,22,6.6,22,7c0,1.7,1.3,3,3,3c0.4,0,0.9-0.1,1.2-0.3c1.2,1.9,1.8,4,1.8,6.3C28,22.6,22.6,28,16,28z"></path>
        </g>
      </g>
    </svg>
  );
};
