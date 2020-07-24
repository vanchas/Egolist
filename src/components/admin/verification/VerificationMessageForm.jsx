import React, {useState} from "react";

export default function () {
    const [reject, setReject] = useState(false)
    const [message, setMessage] = useState('')
    const [showBtn, setShowBtn] = useState(false)

    const rejectHandler = (e) => {
        e.preventDefault()
        setReject(true)
        setShowBtn(false)
    }

    const resolveHandler = (e) => {
        e.preventDefault()
        setReject(false)
        const allow = confirm(`
            Вы подтверждаете ${reject ? 'отказ' : 'верификацию'} ?
        `)
        if (allow) {
            setShowBtn(true)
        }
    }

    const submitHandler = (e) => {
        e.preventDefault()
        if (reject && message.length >= 200) {
            const allow = confirm(`Вы подтверждаете ${reject ? 'отказ' : 'верификацию'} ?`)
            if (allow) {
                console.log('refused')
                setReject(false)
                setShowBtn(false)
            }
        } else {
            console.log('allowed')
            setShowBtn(false)
        }
    }

    return (
        <form className={`py-3`} onSubmit={submitHandler}>
            <div className={`mb-2`}>
                <button className={`btn btn-success mr-2`}
                        onClick={resolveHandler}
                >
                    Подтвердить
                </button>
                <button className={`btn btn-danger mr-2`}
                        onClick={rejectHandler}
                >
                    Отзакать
                </button>
            </div>
            {reject
                ? <label>Причина отказа (минимум 200 символов) [набрано {message.length}]
                <textarea
                    minLength={`200`}
                    rows={`5`}
                    className={`form-control`}
                    onChange={(e) => {
                        setMessage(e.target.value)
                        if (e.target.value.length >= 200) setShowBtn(true)
                    }} />
            </label>
            : null}
            <div>
                {showBtn &&
                    <button className={`btn btn-primary`}
                            disabled={!showBtn}
                            type={`submit`}
                    >
                        Отправить
                    </button>
                }
            </div>
        </form>
    )
}