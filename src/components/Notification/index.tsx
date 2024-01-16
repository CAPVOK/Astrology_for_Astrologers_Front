import React, { useEffect } from "react";
import "./Notification.css";
import { useDispatch } from "../../core/store";
import { INotification, deleteNotification } from "../../core/store/slices/appSlice";

interface NotificationBarProps {
  notifyInfo: INotification;
}

export const Notification: React.FC<NotificationBarProps> = ({
  notifyInfo,
}) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const timeout = setTimeout(() => {
      dispatch(deleteNotification(notifyInfo.id));
    }, 4000);
    return () => clearTimeout(timeout);
  }, [dispatch, notifyInfo]);

  return <div className={notifyInfo.isError ? "notification error" : "notification success"}>{notifyInfo.message}</div>;
};
