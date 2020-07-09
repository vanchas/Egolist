import React from 'react'
import Link from 'next/link'
import s from './user.module.scss'
import { authenticationService } from '../../_services'

export default function SidebarUserProfile() {
  return (
    <div className={s.user_profile}>
      <Link href="/login" as={`/login`}>
        <a className="btn btn-primary my-2 ml-2">Войти</a>
      </Link>
      {authenticationService.currentUserValue.token
        ? <ul style={{ listStyle: 'none', padding: '0 0 0 .5em' }}>
          {authenticationService.currentUserValue.user.is_admin ?
            <li>
              <Link href="/admin" as={`/admin`}>
                <a className="btn btn-secondary">Админ</a>
              </Link>
            </li> : null}
          <li>
            <Link href="/updateDesire" as={`/updateDesire`}>
              <a className="btn btn-secondary">Обновить желание</a>
            </Link>
          </li>
          <li>
            <Link href="/addNewLot" as={`addNewLot`}>
              <a className="btn btn-secondary">Добавить Желание</a>
            </Link>
          </li>
          <li>
            <Link href="/favorites" as={`/favorites`}>
              <a className="btn btn-secondary">Избранные</a>
            </Link>
          </li>
          <li>
            <button className="btn btn-dark"
              onClick={authenticationService.logout} >
              Выйти</button>
          </li>
        </ul>
        : null}
    </div>
  )
}
