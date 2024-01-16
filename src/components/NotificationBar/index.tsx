import React from "react";
import "./Notifications.css";
import { Notification } from "../Notification";
import { useSelector } from "../../core/store";

export const NotificationBar: React.FC = () => {
  const notifications = useSelector((state) => state.app.notifications);

  return (
    <div className="notifications">
      {notifications
        .map((notification) => (
          <Notification key={notification.id} notifyInfo={notification} />
        ))
        .reverse()}
    </div>
  );
};
