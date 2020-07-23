import React, { useState } from 'react'
import s from './sidebar.module.scss'
import SidebarMessages from './SidebarMessages'
import SidebarSettings from './SidebarSettings'
import SidebarStatistics from './SidebarStatistics'
import SidebarUserProfile from './SidebarUserProfile'
import UserBar from './UserBar'
import {authenticationService} from "../../_services/authentication.service";

export default function Sidebar(props) {
  const [component, setComponent] = useState(<SidebarMessages />);
  const [activeLink, setActiveLink] = useState();

  const changeComponent = ref => {
    setActiveLink(ref);
    if (ref === "profile") {
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
    <aside className={`${s.sidebar}`}>
      {authenticationService.currentUserValue && authenticationService.currentUserValue.user
          ? <>
            <div className={s.sidebar_user}>
              <UserBar />
                  <div className={s.sidebar_user_control}>
                    <span className={`btn ${activeLink === 'profile' ? s.aside_btn_active : ''}`}
                                onClick={e => changeComponent('profile')}>Профиль</span>
                    <span className={`btn ${activeLink === 'messages' ? s.aside_btn_active : ''}`}
                                onClick={e => changeComponent('messages')}>Сообщения</span>
                    <span className={`btn ${activeLink === 'statistics' ? s.aside_btn_active : ''}`}
                                onClick={e => changeComponent('statistics')}>Статистика</span>
                    <span className={`btn ${activeLink === 'settings' ? s.aside_btn_active : ''}`}
                                onClick={e => changeComponent('settings')}>Настройки</span>
                  </div>
            </div>

            <div>{component}</div>
          </> :
        <span className={`btn btn-primary m-2 mr-auto`}>Вход</span>
      }
    </aside>
  )
}
