import React, { useState } from "react";
import s from "./user.module.scss";
import Chat from "../chat/Chat";
import User from "../../assets/sidebar/user.jpeg";

const chats = [
  { name: "Fake 1", photo: User, online: true },
  { name: "Fake 2", photo: User, online: true },
  { name: "Fake 3", photo: User, online: true },
  { name: "Fake 4", photo: User, online: false },
];

export default function SidebarMessages() {
  const [openChat, setOpenChat] = useState(false);

  return (
    <div className={s.sidebar_messages}>
      {!openChat ? (
        <ul className={s.chats_list}>
          {chats.map((c, i) => (
            <li key={i} onClick={() => setOpenChat(true)}>
              <div>
                {c.online && <span />}
                <img src={c.photo} alt={``} />
              </div>
              <span>{c.name}</span>
            </li>
          ))}
        </ul>
      ) : (
        <>
          <div>
            <span
              className={`btn btn-outline-secondary mb-2`}
              onClick={() => setOpenChat(false)}
            >
              Назад к чатам
            </span>
          </div>
          <Chat />
        </>
      )}
    </div>
  );
}
