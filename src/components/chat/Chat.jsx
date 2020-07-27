import React, { useEffect, useState } from "react";
import s from "./chat.module.scss";
import { getUserMessages } from "../../redux/actions/userActions";
import { connect } from "react-redux";
import HttpRequest from "../../_helpers/HttpRequest";

function Chat(props) {
  const [text, setText] = useState("");
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(true);

  const makeMessagesRead = () => {
    props.messages.forEach(mes => {
      if (!mes.is_checked) {
        HttpRequest.execute(`/messages/${mes.id}`)
      }
    })
  }

  useEffect(() => {
    if (props.messages) {
      setLoading(false);
      makeMessagesRead()
    } else {
      props.getUserMessages();
    }
    setTimeout(() => setLoading(false), 5000);
  }, [props.messages]);

  const submitHandler = (e) => {
    e.preventDefault();
    // if (text.length) {
    //   setMessages([
    //     ...messages,
    //     { id: Date.now(), message: text, author: "user" },
    //   ]);
    //   setText("");
    // }
  };

  return (
    <div className={s.wrapper}>
      <div className={s.chat}>
        <div className={s.chat_title}>
          <h1>Админ Админович</h1>
          <h2>администратор</h2>
          <figure className={s.avatar}>
            <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/156381/profile/profile-80.jpg" />
          </figure>
        </div>
        <div className={s.messages}>
          {loading ? (
            <div>Загрузка...</div>
          ) : props.messages && props.messages.length ? (
            <div className={s.messages_content}>
              {props.messages.map((msg, i) => (
                <div
                  key={i}
                  className={
                    msg.author === "admin"
                      ? s.message
                      : `${s.message} ${s.message_personal}`
                  }
                >
                  {msg.message}
                </div>
              ))}
            </div>
          ) : (
            <div>Сообщений нет</div>
          )}
        </div>
        <div className={`py-2 text-center text-white`}>
          Это пока все все уведомления
        </div>
        <form className={s.message_box} onSubmit={submitHandler}>
          <textarea
            value={text}
            className={s.message_input}
            placeholder="Type message..."
            onChange={(e) => setText(e.target.value)}
          />
          <label className={s.file}>
            <span>&#x2709;</span>
            <input type={`file`} onChange={(e) => setFile(e.target.files[0])} />
          </label>
          <button type="submit" className={s.message_submit}>
            Отправить
          </button>
        </form>
      </div>
      <div className={s.bg} />
    </div>
  );
}

const mapStateToProps = (state) => ({
  messages: state.user.myMessages ? state.user.myMessages.messages : null,
});
const mapDispatchToProps = {
  getUserMessages,
};
export default connect(mapStateToProps, mapDispatchToProps)(Chat);
