import React, { useEffect, useState } from "react";
import s from "./user.module.scss";
import Chat from "../chat/Chat";
import User from "../../assets/sidebar/user.jpeg";
import { connect } from "react-redux";
import { getChatsList } from "../../redux/actions/userActions";
import formatDate from "../../utils/format-date-string";

function SidebarMessages(props) {
  const [openChat, setOpenChat] = useState(null);

  useEffect(() => {
    props.getChatsList();
  }, []);

  return (
    <div className={s.sidebar_messages}>
      {!openChat ? (
        props.chats && props.chats.length ? (
          <ul className={s.chats_list}>
            {props.chats.map((c, i) => (
              <li key={i} onClick={() => setOpenChat(c.id)}>
                <div className={s.user_ava}>
                  {c.online && <span />}
                  <img src={User} alt={``} />
                </div>
                <div>
                  <span>{c.users[0].name} &nbsp;</span>
                  <small className={`text-white float-right`}>{formatDate(c.updated_at)}</small>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <div className={`text-white text-center pt-2`}>У Вас пока нет активных чатов</div>
        )
      ) : (
        <>
          <div>
            <span
              className={`btn btn-outline-secondary mb-2`}
              onClick={() => setOpenChat(null)}
            >
              Назад к чатам
            </span>
          </div>
          <Chat id={openChat} />
        </>
      )}
    </div>
  );
}

const mapStateToProps = (state) => ({
  chats: state.user.chats,
});
const mapDispatchToProps = {
  getChatsList,
};
export default connect(mapStateToProps, mapDispatchToProps)(SidebarMessages);
