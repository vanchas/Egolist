import React from 'react'
import Link from 'next/link'
import s from './user.module.scss'
import { authenticationService } from '../../_services'

export default function SidebarUserProfile() {
  return (
    <div className={s.user_profile}>
      <Link href="/login">
        <a className="btn btn-primary my-2 ml-2">Войти</a>
      </Link>
      {authenticationService.currentUserValue.token
        ? <ul style={{ listStyle: 'none', padding: '0 0 0 .5em' }}>
              <li>
                  <Link href="/cabinet">
                      <a className="btn btn-secondary">Личный кабинет</a>
                  </Link>
              </li>
              {authenticationService.currentUserValue.user.is_admin ?
            <li>
              <Link href="/admin">
                <a className="btn btn-secondary">Кабинет админа</a>
              </Link>
            </li> : null}
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
