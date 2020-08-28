import React, { useRef, useState } from "react";
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
  const dropDown = useRef(null);
  const [currentLink, setCurrentLink] = useState(linkButtons[1])

  const dropDownToggler = () => {
    dropDown.current.classList.contains("show")
      ? dropDown.current.classList.remove("show")
      : dropDown.current.classList.add("show");
  };

  const dropDownClickHandler = (link) => {
    setCurrentLink(link)
    props.changeComponent(link.name_en)
    dropDownToggler()
  }

  return (
    <div className={`shadow ${s.sidebar_user_control}`}>
      {/*        {props.messagesCount && props.messagesCount > 0 ? (*/}
      {/*          <>*/}
      {/*            <img src={NotificationBell} alt={``} className={s.bell} />*/}
      {/*            <span className={s.notifications_number}>*/}
      {/*              {props.messagesCount}*/}
      {/*            </span>*/}
      {/*          </>*/}
      {/*        ) : null}*/}

      <div className="dropdown">
        <span
          className="btn dropdown-toggle"
          type="button"
          id="dropdownMenuButton"
          data-toggle="dropdown"
          aria-haspopup="true"
          aria-expanded="false"
          onClick={dropDownToggler}
        >
          {currentLink.name_ru}
        </span>
        <div
          className="dropdown-menu"
          ref={dropDown}
          aria-labelledby="dropdownMenuButton"
        >
          {linkButtons.map((link, i) => (
            <a className="dropdown-item" href="#" key={i} onClick={() => dropDownClickHandler(link)}>
              {link.name_ru}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => ({
  messagesCount: state.user.myMessages ? state.user.myMessages.counter : 0,
});
export default connect(mapStateToProps, null)(SidebarControl);
