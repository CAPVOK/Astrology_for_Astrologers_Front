import "./HistoryPage.css";
import { FC } from "react";
import { useHistoryPage } from "./useHistoryPage";
import {
  BreadCrumbs,
  ConstellationTable,
  Filters,
  Loader,
} from "../../components";

export const HistoryPage: FC = () => {
  const { tableProps, isPageLoading, crumbsProps, filtersProps } =
    useHistoryPage();

  return (
    <div className="history_page">
      <BreadCrumbs {...crumbsProps} />
      <Filters {...filtersProps} />
      {isPageLoading ? (
        <div className="history_page_loader">
          <Loader />
        </div>
      ) : (
        <ConstellationTable {...tableProps} />
      )}
    </div>
  );
};
