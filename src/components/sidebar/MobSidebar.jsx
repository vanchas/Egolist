import React, { useState } from 'react'
import s from './mob-sidebar.module.scss'
import SidebarMessages from './SidebarMessages'
import SidebarSettings from './SidebarSettings'
import SidebarStatistics from './SidebarStatistics'
import SidebarUserProfile from './SidebarUserProfile'
import { useRouter } from 'next/router'
import UserBar from './UserBar'

export default function MobSidebar() {
  const router = useRouter();
  const [component, setComponent] = useState();
  const [activeLink, setActiveLink] = useState();

  const changeComponent = ref => {
    setActiveLink(ref);
    if (ref === "profile") {
      router.push('/login');
      setComponent(<SidebarUserProfile />);
    } else if (ref === "messages") {
      setComponent(<SidebarMessages />);
    } else if (ref === "statistics") {
      setComponent(<SidebarStatistics />);
    } else if (ref === "settings") {
      setComponent(<SidebarSettings />);
    }
  }

  return (
    <aside className={s.sidebar}>
      <div className={s.sidebar_user}>
        <UserBar />
        <div className={s.sidebar_user_control}>
          <span className={`btn ${activeLink === 'profile' ? s.aside_btn_active : ''}`} onClick={e => changeComponent('profile')}>Профиль</span>
          <span className={`btn ${activeLink === 'messages' ? s.aside_btn_active : ''}`} onClick={e => changeComponent('messages')} >Сообщения</span>
          <span className={`btn ${activeLink === 'statistics' ? s.aside_btn_active : ''}`} onClick={e => changeComponent('statistics')}>Статистика</span>
          <span className={`btn ${activeLink === 'settings' ? s.aside_btn_active : ''}`} onClick={e => changeComponent('settings')} >Настройки</span>
        </div>
      </div>

      <div>{component}</div>
    </aside>
  )
};
