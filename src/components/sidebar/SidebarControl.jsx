import React, { useState } from "react";
import s from "./control.module.scss";
import NotificationBell from "../../assets/sidebar/notification.png";
import { connect } from "react-redux";

const linkButtons = [
  { name_ru: "Профиль", name_en: "profile", id: 0 },
  { name_ru: "Сообщения", name_en: "messages", id: 1 },
  { name_ru: "Статистика", name_en: "statistics", id: 2 },
  { name_ru: "Настройки", name_en: "settings", id: 3 },
];

function SidebarControl(props) {
  const [curIndex, setCurIndex] = useState(1);

  const controlHandler = (n) => {
      if (n === -1) {
        if (curIndex === 0) {
          props.changeComponent(linkButtons[3].name_en)
          setCurIndex(3);
        } else {
          props.changeComponent(linkButtons[curIndex + n].name_en)
          setCurIndex((curIndex) => curIndex + n);
        }
      } else if (n === 1) {
        if (curIndex === linkButtons.length - 1) {
          props.changeComponent(linkButtons[0].name_en)
          setCurIndex(0);
        } else {
          props.changeComponent(linkButtons[curIndex + n].name_en)
          setCurIndex((curIndex) => curIndex + n);
        }
      }
  };

  return (
    <div className={`shadow-sm ${s.sidebar_user_control}`}>
      <div />
      <div>
        <span onClick={() => controlHandler(1)} className={s.arrow}>
          &#x276C;
        </span>
        <span
          className={`btn ${s.link}`}
        >
          {linkButtons[curIndex].name_ru}
          {linkButtons[curIndex].id === 1 ? (
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
        <span onClick={() => controlHandler(-1)} className={s.arrow}>
          &#x276D;
        </span>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => ({
  messagesCount: state.user.myMessages ? state.user.myMessages.counter : 0,
});
export default connect(mapStateToProps, null)(SidebarControl);
