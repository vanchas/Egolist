import React, {useState} from "react";
import s from "./admin.module.scss";
import CategoriesEdit from "./CategoriesEdit";
import ComplaintsList from "./ComplaintsList";
import Verification from "./verification/Verification";
import UsersList from "./users-list/UsersList";

export default function (props) {

    const changeComponent = (ref) => {
        switch (ref) {
            case 'categories':
                return props.setComponent(<CategoriesEdit />)
            case 'complaints':
                return props.setComponent(<ComplaintsList />)
            case 'verification':
                return props.setComponent(<Verification />)
            case 'users list':
                return props.setComponent(<UsersList />)
        }
    }

    return (
        <div className={s.admin_page_control}>
            <span className={`btn btn-secondary`}
                      onClick={() => changeComponent('categories')}>
                      Управление категориями</span>
            <span className={`btn btn-secondary`}
                  onClick={() => changeComponent('complaints')}>
                      Управление жалобами</span>
            <span className={`btn btn-secondary`}
                  onClick={() => changeComponent('verification')}>
                      Управление верификацией</span>
            <span className={`btn btn-secondary`}
                  onClick={() => changeComponent('users list')}>
                      Список всех пользователей</span>
        </div>
    )
}