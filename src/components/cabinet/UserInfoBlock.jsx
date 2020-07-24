import React, {useEffect, useState} from 'react'
import {authenticationService} from "../../_services/authentication.service";

export default function () {
    const [user, setUser] = useState(null)

    useEffect(() => {
        const userData = authenticationService.currentUserValue
        if (userData.user) {
            setUser(userData.user)
        }
    }, [])

    return (
        <div>{user &&
            user.active
            ? <div>Статус: <span className={`text-success`}>Верифицирован</span></div>
            : <div>Статус: <span className={`text-danger`}>Не верифицирован</span></div>
        }</div>
    )
}