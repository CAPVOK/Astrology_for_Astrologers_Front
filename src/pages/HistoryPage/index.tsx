import "./HistoryPage.css";
import { FC } from "react";
import { useHistoryPage } from "./useHistoryPage";
import { Link } from "react-router-dom";

export const HistoryPage: FC = () => {
  const { constellations } = useHistoryPage();

  return (
    <div className="history_page">
      <div className="constellations">
        {constellations &&
          !!constellations.length &&
          constellations.map((stella) => (
            <Link to={`/constellations/${stella.id}`}>{stella.name}</Link>
          ))}
      </div>
    </div>
  );
};
