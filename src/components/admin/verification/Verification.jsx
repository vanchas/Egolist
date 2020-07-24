import React from "react";
import s from './verification.module.scss'
import VerificationRequestItem from "./VerificationRequestItem";
import VerifyExamplePhotos from "./VerifyExamplePhotos";

const verifications = [1]

export default function () {

    return (
        <div className={s.verification_block}>
            <VerifyExamplePhotos />
            <div className={`h3 py-3 ${s.heading}`}>Заявки на верификацию</div>
            {verifications && verifications.length
                ? <ul className={s.users_list}>
                    {verifications.map((user, ind) => (
                        <VerificationRequestItem key={ind} user={user}/>
                    ))}
                </ul>
                : <div>Активных заявок на верификацию нет</div>
            }
        </div>
    )
}