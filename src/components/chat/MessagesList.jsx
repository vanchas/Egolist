import React from "react";
import s from "./chat.module.scss";

export default function (props) {
  return (
    <>
      {props.loading ? (
        <div className={`text-center mt-2`}>Загрузка...</div>
      ) : props.messages && props.messages.length ? (
        <div className={`element ${s.messages_content}`}>
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
          {props.scrollLoading ? (
            <div className={`text-center py-1`}>
              <div className="spinner-border text-info" role="status">
                <span className="sr-only">Loading...</span>
              </div>
            </div>
          ) : props.currentPage - 1 === props.lastPage ? (
            <div className={`text-center py-1`}>Это пока все уведомления</div>
          ) : null}
        </div>
      ) : (
        <div className={`text-center mt-2`}>Сообщений нет</div>
      )}
    </>
  );
}
