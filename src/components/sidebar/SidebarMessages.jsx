import React from 'react'
import Chat from '../../assets/sidebar/chat.png'
import s from './user.module.scss'

export default function SidebarMessages() {
  return (
    <div className={s.sidebar_messages}>
      <img src={Chat} alt="" className={`w-100`} />
    </div>
  )
}
