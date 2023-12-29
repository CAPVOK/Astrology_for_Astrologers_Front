import "./HistoryPage.css";
import { FC } from "react";
import { useHistoryPage } from "./useHistoryPage";

export const HistoryPage: FC = () => {
  // eslint-disable-next-line no-empty-pattern
  const {} = useHistoryPage();

  return <div className="history_apge"></div>;
};
