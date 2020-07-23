import React, {useState} from 'react'
import s from './chat.module.scss'

export default function Chat(props) {
    const [messages, setMessages] = useState([
        {id: Date.now(), message: 'Новое сообщение', author: 'admin'},
        {id: Date.now()+1, message: 'Ответное сообщение', author: 'user'},
    ])
    const [text, setText] = useState('')

    const submitHandler = (e) => {
        e.preventDefault()
        if (text.length) {
            setMessages([...messages, {id: Date.now(), message: text, author: 'user'}])
            setText('')
        }
    }

    return (
        <div className={s.wrapper}>
            <div className={s.chat}>
                <div className={s.chat_title}>
                    <h1>Админ Админович</h1>
                    <h2>администратор</h2>
                    <figure className={s.avatar}>
                        <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/156381/profile/profile-80.jpg"/></figure>
                </div>
                <div className={s.messages}>
                    <div className={s.messages_content}>
                        {messages.map((msg, i) => (
                            <div key={i}
                                 className={
                                     msg.author === 'admin'
                                         ? s.message
                                         : `${s.message} ${s.message_personal}`
                                 }>
                                {msg.message}
                            </div>
                        ))}
                    </div>
                </div>
                <form className={s.message_box}
                    onSubmit={submitHandler}
                >
                    <textarea
                        type="text"
                        value={text}
                        className={s.message_input}
                        placeholder="Type message..."
                        onChange={e=>setText(e.target.value)}
                    />
                    <button type="submit" className={s.message_submit}>Отправить</button>
                </form>

            </div>
            <div className={s.bg}></div>
        </div>
    )
}
