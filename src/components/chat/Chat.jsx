import React, {useEffect, useRef, useState} from "react";
import s from "./chat.module.scss";
// import { getUserMessages } from "../../redux/actions/userActions";
import { connect } from "react-redux";
import HttpRequest from "../../_helpers/HttpRequest";
import MessagesList from "./MessagesList";

function Chat(props) {
  const [text, setText] = useState("");
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [scrollLoading, setScrollLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [length, setLength] = useState(0);
  const [lastPage, setLastPage] = useState(1);
  const [messages, setMessages] = useState([]);

  const makeMessagesRead = () => {
    if (props.messages && props.messages.length) {
      props.messages.forEach((mes) => {
        if (!mes.is_checked) {
          HttpRequest.execute(`/messages/${mes.id}`);
        }
      });
    }
  };

  const fetchMoreMessages = async () => {
    await setScrollLoading(true)
    await setCurrentPage(prevCurrentPage => prevCurrentPage + 1)
    await setLength(length * 2)
    fetchMessages(currentPage)
  };

  const fetchMessages = () => {
    // Pusher.logToConsole = true;
    //
    // const pusher = new Pusher('abeaa19bc712bf37d872', {
    //   cluster: 'eu'
    // });
    //
    // const channel = pusher.subscribe('chat-channel');
    // channel.bind('CreateMessageEvent', function(data) {
    //   console.log(JSON.stringify(data));
    // });

    HttpRequest.execute(`/chats/messages/show/${props.id}?page=${currentPage}`)
        .then((data) => {
          setLength(data.per_page)
          setLastPage(data.last_page)
          setMessages(messages.concat(data.data))
          setScrollLoading(false)
        }).catch((err) => console.error("Error:", err));

    // HttpRequest.execute(`/messages?page=${currentPage}`)
    //     .then((data) => {
    //       setLength(data.messages.per_page)
    //       setLastPage(data.messages.last_page)
    //       setMessages(messages.concat(data.messages.data))
    //       setScrollLoading(false)
    //     }).catch((err) => console.error("Error:", err));
  }

  useEffect(() => {
    if (messages.length) {
      setLoading(false);
      makeMessagesRead();
    } else {
      fetchMessages()
      // props.getUserMessages(currentPage);
    }
    setTimeout(() => setLoading(false), 5000);
  }, [messages]);

  const submitHandler = (e) => {
  //   e.preventDefault();
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
            <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/156381/profile/profile-80.jpg"  alt={``}/>
          </figure>
        </div>
        <div className={s.messages}
        onScroll={(e) => {
          if (e.target.scrollTop >= e.target.offsetHeight && currentPage <= lastPage) {
            fetchMoreMessages()
          }
        }}>
        <MessagesList
            currentPage={currentPage}
            lastPage={lastPage}
            scrollLoading={scrollLoading}
            loading={loading}
            messages={messages}
        />
        </div>
        <form className={s.message_box} onSubmit={submitHandler}>
          {/*<textarea*/}
          {/*  value={text}*/}
          {/*  className={s.message_input}*/}
          {/*  placeholder="Type message..."*/}
          {/*  onChange={(e) => setText(e.target.value)}*/}
          {/*/>*/}
          {/*<label className={s.file}>*/}
          {/*  <span>&#x2709;</span>*/}
          {/*  <input type={`file`} onChange={(e) => setFile(e.target.files[0])} />*/}
          {/*</label>*/}
          {/*<button type="submit" className={s.message_submit}>*/}
          {/*  Отправить*/}
          {/*</button>*/}
        </form>
      </div>
      <div className={s.bg} />
    </div>
  );
}

const mapStateToProps = (state) => ({
  // messages: state.user.myMessages
  //     ? state.user.myMessages.messages.data
  //     : null,
  // current_page: state.user.myMessages
  //   ? state.user.myMessages.messages.current_page
  //   : 1,
  // per_page: state.user.myMessages
  //     ? state.user.myMessages.messages.per_page
  //     : 1,
});
const mapDispatchToProps = {
  // getUserMessages,
};
export default connect(mapStateToProps, mapDispatchToProps)(Chat);
