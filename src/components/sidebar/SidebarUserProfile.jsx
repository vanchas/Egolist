import React, { useEffect, useState } from "react";
import Link from "next/link";
import s from "./user.module.scss";
import { authenticationService } from "../../_services";

export default function SidebarUserProfile(props) {
  const [windowWidth, setWindowWidth] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const userData = authenticationService.currentUserValue;
    if (userData && userData.user) setUser(userData);
    setWindowWidth(window.innerWidth);
  }, []);

  const logout = () => {
    authenticationService.logout();
    if (windowWidth < 769) {
      props.showSidebar(false);
    }
  };

  return (
    <div className={s.user_profile}>
      {user && user.user ? null : (
        <Link href="/login">
          <a
            onClick={() => {
              if (windowWidth < 769) props.showSidebar(false);
            }}
            className="btn btn-primary my-2 ml-2"
          >
            Логин
          </a>
        </Link>
      )}
      {user && user.token ? (
        <ul style={{ listStyle: "none", padding: "0 0 0 .5em" }}>
          {user && !user.user.is_admin && (
            <li>
              <Link href="/cabinet">
                <a
                  className="btn btn-secondary my-2"
                  onClick={() => {
                    if (windowWidth < 769) props.showSidebar(false);
                  }}
                >
                  Личный кабинет
                </a>
              </Link>
            </li>
          )}
          {user && user.user.is_admin ? (
            <li>
              <Link href="/admin">
                <a
                  className="btn btn-secondary my-2"
                  onClick={() => {
                    if (windowWidth < 769) props.showSidebar(false);
                  }}
                >
                  Кабинет админа
                </a>
              </Link>
            </li>
          ) : null}
          <li>
            <button className="btn btn-dark" onClick={logout}>
              Выйти
            </button>
          </li>
        </ul>
      ) : null}
    </div>
  );
}
