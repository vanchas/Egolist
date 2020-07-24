import React from "react";
import s from './verification.module.scss'
import VerificationRequestItem from "./VerificationRequestItem";
import VerifyExamplePhotos from "./VerifyExamplePhotos";

const verifications = [1]

export default function () {

    return (
        <div>
            <VerifyExamplePhotos />
            <div className={`h3 py-3`}>Заявки на верификацию</div>
            {verifications && verifications.length
                ? <ul>
                    {verifications.map((user, ind) => (
                        <VerificationRequestItem key={ind} user={user}/>
                    ))}
                </ul>
                : <div>Активных заявок на верификацию нет</div>
            }
        </div>
    )
}