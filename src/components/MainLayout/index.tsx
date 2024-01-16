import React from "react";
import { NotificationBar } from "../NotificationBar";
import "./MainLayout.css";
import { Outlet } from "react-router-dom";

export const MainLayout: React.FC = () => {
  return (
    <div className="mainlayout">
      <Outlet />
      <NotificationBar />
    </div>
  );
};
