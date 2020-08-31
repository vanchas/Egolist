import React from 'react'
import s from "./cabinet.module.scss";

export default function (props) {
    return (
        <div className={`py-3 ${s.cabinet_control_buttons}`}>
            <span
                className={`btn m-1 ${
                    props.activeBtn === "update info" ? "btn-outline-light" : "btn-outline-light"
                }`}
                onClick={() => props.changeVisibleComponent("complaints")}
            >
              Мои жалобы
            </span>
            <span
                className={`btn m-1 ${
                    props.activeBtn === "complaints" ? "btn-outline-light" : "btn-outline-light"
                }`}
                onClick={() => props.changeVisibleComponent("update info")}
            >
              Редактировать информацию о себе
            </span>
            <span
                className={`btn m-1 ${
                    props.activeBtn === "verification" ? "btn-outline-light" : "btn-outline-light"
                }`}
                onClick={() => props.changeVisibleComponent("verification")}
            >
              Верификация
            </span>
        </div>
    )
}