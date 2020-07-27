import React from "react";
import s from "./control.module.scss";
import NotificationBell from "../../assets/sidebar/notification.png";
import { connect } from "react-redux";

const linkButtons = [
  { name_ru: "Профиль", name_en: "profile" },
  { name_ru: "Сообщения", name_en: "messages" },
  { name_ru: "Статистика", name_en: "statistics" },
  { name_ru: "Настройки", name_en: "settings" },
];

function SidebarControl(props) {
  return (
    <div className={s.sidebar_user_control}>
      {linkButtons.map((link, ind) => {
        return (
          <span
            key={ind}
            className={`btn ${s.link} ${
              props.activeLink === link.name_en ? s.aside_btn_active : ""
            }`}
            onClick={(e) => props.changeComponent(link.name_en)}
          >
            {link.name_ru}
            {ind === 1 ? (
              <>
                {props.messagesCount && props.messagesCount > 0 ? (
                  <>
                    <img src={NotificationBell} alt={``} className={s.bell} />
                    <span className={s.notifications_number}>
                      {props.messagesCount}
                    </span>
                  </>
                ) : null}
              </>
            ) : null}
          </span>
        );
      })}
    </div>
  );
}

const mapStateToProps = (state) => ({
  messagesCount: state.user.myMessages ? state.user.myMessages.counter : 0
});
export default connect(mapStateToProps, null)(SidebarControl);
