import React from "react";
import s from "./control.module.scss";
import NotificationBell from "../../assets/sidebar/notification.png";

const linkButtons = [
  { name_ru: "Профиль", name_en: "profile" },
  { name_ru: "Сообщения", name_en: "messages" },
  { name_ru: "Статистика", name_en: "statistics" },
  { name_ru: "Настройки", name_en: "settings" },
];

export default function (props) {
  return (
      <div className={s.sidebar_user_control}>
        {linkButtons.map((link, ind) => {
          return (
            <span key={ind}
              className={`btn ${s.link} ${
                props.activeLink === link.name_en ? s.aside_btn_active : ""
              }`}
              onClick={(e) => props.changeComponent(link.name_en)}
            >
                {link.name_ru}
                {ind === 1
                    ? <>
                        <img src={NotificationBell} alt={``} className={s.bell} />
                        <span className={s.notifications_number}>3</span>
                    </>
                    : null
                }
            </span>
          );
        })}
      </div>
  );
}
