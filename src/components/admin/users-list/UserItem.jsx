import React from "react";

export default function (props) {

    return (
        <li className={`py-2`}>
            <div>
                <span>{props.user.name}</span>
                <span
                    className={`btn btn-outline-secondary ml-2`}
                    onClick={() => props.setUserToUpdate(props.user)}
                >Редактировать профиль</span>
            </div>
        </li>
    )
}