import React, { useEffect, useState } from 'react'
import Location from '../../assets/sidebar/Location.png'
import { authenticationService } from '../../_services';
import s from './sidebar.module.scss'
import Placeholder from '../../assets/user-placeholder.jpg'
import Rating from '../helpers/Rating'
import { connect } from 'react-redux';

function UserBar({ locations }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const user = authenticationService.currentUserValue;
    if (user.token) {
      setUser(user);
      locations.map(loc => {
        if (loc.id === user.user.region_id) {
          user.user.location = loc.name_ru;
        }
      })
    }
  }, [])

  return (
    <div className={s.user_bar}>{user && user.token ? <>
      <div className={s.user_ava}>
        {user && user.user && user.photo
          ? <img src={user.user.photo} alt={user.user.name} />
          : <img src={Placeholder} alt="" />}
      </div>
      <div className={s.user_info}>
        <span className={s.username}>{user.user.name || 'USERNAME'}</span>
        <div className={s.user_rating}>
          <Rating rating={user.user.rating} />
        </div>
        <span className={s.user_location}>
          <img src={Location} alt="location" />
          {user.user.location || 'location'}
        </span>
      </div>
    </> : null}
    </div>
  )
}

const mapStateToProps = (state) => ({
  locations: state.app.locations
})

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(UserBar)
