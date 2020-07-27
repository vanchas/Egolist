import React, {useState} from "react";
import s from "./verification.module.scss";
import VerificationMessageForm from "./VerificationMessageForm";


export default function ({user}) {
    const [showLargePhoto, setShowLargePhoto] = useState(false)

    return (
        <li>
            <div>
                <span>пользователь: {user.name}</span><br />
                <small className={`text-secondary`}>подано: 20.03.2020, 16:30</small>
            </div>
            <div>
                {user && user.files
                ? user.files.map((photo, i) => (
                        <img src={photo}
                             onClick={()=>setShowLargePhoto(!showLargePhoto)}
                             alt={user.name}
                             className={showLargePhoto ? s.verification_photo_large : s.verification_photo}
                        />
                    )): null}
            </div>
            <VerificationMessageForm user={user} />
            <hr />
        </li>
    )
}