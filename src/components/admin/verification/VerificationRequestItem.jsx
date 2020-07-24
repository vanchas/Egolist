import React, {useState} from "react";
import UserVerificationPhoto from '../../../assets/user-verification.jpg'
import s from "./verification.module.scss";
import VerificationMessageForm from "./VerificationMessageForm";


export default function () {
    const [showLargePhoto, setShowLargePhoto] = useState(false)

    return (
        <li>
            <div>
                <span>пользователь: Катерина Екатериновна</span><br />
                <small className={`text-secondary`}>подано: 20.03.2020, 16:30</small>
            </div>
            <div>
                <img src={UserVerificationPhoto}
                     onClick={()=>setShowLargePhoto(!showLargePhoto)}
                     alt={'Катерина Екатериновна'}
                     className={showLargePhoto ? s.verification_photo_large : s.verification_photo} />
            </div>
            <VerificationMessageForm />
            <hr />
        </li>
    )
}