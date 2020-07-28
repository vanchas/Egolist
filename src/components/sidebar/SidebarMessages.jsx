import React, { useState } from "react";
import s from "./user.module.scss";
import Chat from "../chat/Chat";

export default function SidebarMessages() {
  const [showNotifications, setShowNotifications] = useState(false);

  return (
    <div className={s.sidebar_messages}>
      <div className={`mb-2`}>
        <span
          className={`btn btn-outline-info`}
          onClick={() => setShowNotifications(!showNotifications)}
        >
          Уведомления
        </span>
      </div>
      {showNotifications && <Chat />}
    </div>
  );
}
