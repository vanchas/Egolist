import React, {useEffect, useState} from 'react'
import s from './mob-sidebar.module.scss'
import SidebarMessages from './SidebarMessages'
import SidebarSettings from './SidebarSettings'
import SidebarStatistics from './SidebarStatistics'
import SidebarUserProfile from './SidebarUserProfile'
import UserBar from './UserBar'
import {authenticationService} from "../../_services/authentication.service";
import Link from "next/link";
import SidebarControl from "./SidebarControl";

export default function MobSidebar(props) {
  const [component, setComponent] = useState();
  const [activeLink, setActiveLink] = useState();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const userData = authenticationService.currentUserValue
    if (userData && userData.user) setUser(userData.user)
  }, [])

  const changeComponent = ref => {
    setActiveLink(ref);
    if (ref === "profile") {
      setComponent(<SidebarUserProfile showSidebar={props.showSidebar} />);
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
      {user
          ? <>
            <UserBar />
            <SidebarControl
                activeLink={activeLink}
                changeComponent={changeComponent}
            />

            <div>{component}</div>
          </> :
          <span>
          <Link href={`/login`}>
            <a className={`btn btn-primary m-2 mr-auto`}>
              Вход
            </a>
          </Link>
        </span>
      }
    </aside>
  )
};
