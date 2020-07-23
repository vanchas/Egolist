import React from 'react'
import s from './user.module.scss'
import Chat from "../chat/Chat";

export default function SidebarMessages() {
  return (
    <div className={s.sidebar_messages}>
        <Chat />
    </div>
  )
}
