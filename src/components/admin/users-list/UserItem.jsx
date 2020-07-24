import React, { useState } from "react";
import s from './update.module.scss'

export default function (props) {
  const [toast, setToast] = useState(false);

  return (
    <li className={`py-2 ${s.list_item}`}>
        <span>{props.user.name}</span>
        <span
          className={`btn btn-outline-dark px-1 py-0 ml-2 ${s.toast}`}
          onMouseEnter={() => setToast(true)}
          onMouseLeave={() => setToast(false)}
        >
          &#x2630;
            {toast && (
                <span
                    className={`${s.toast_item} btn btn-outline-secondary ml-2`}
                    onClick={() => props.setUserToUpdate(props.user)}
                >
            Редактировать профиль
          </span>
            )}
        </span>
    </li>
  );
}
