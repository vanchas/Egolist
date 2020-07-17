import React, { useEffect, useState } from "react";
import s from "./user.module.scss";
import Location from "../../assets/sidebar/Location.png";
import moment from "moment";
import Rating from "../helpers/Rating";
import Placeholder from "../../assets/user-placeholder.jpg";

export default function UserCard({ user, locations }) {
  const [daysOnEgolist, setDaysOnEgolist] = useState(0);
  const [userLocation, setUserLocation] = useState("");
  const [loading, setLoading] = useState(true);
  const [daysText, setDaysText] = useState("Дней");

  useEffect(() => {
    if (user) {
      setLoading(false);
      daysCounter(user);
      locations.forEach((loc) => {
        if (loc.id === user.region_id) {
          setUserLocation(loc.name_ru);
        }
      });
    }
    setTimeout(() => setLoading(false), 5000);
  }, [user]);

  const daysCounter = (user) => {
    (async function () {
      const createdAt = await user.created_at
          .split("T")[0]
          .split("-")
          .map((i) => parseFloat(i));
      const date1 = await moment(createdAt)._i;
      const date2 = moment()
          .format()
          .split("T")[0]
          .split("-")
          .map((i) => parseFloat(i));
      setDaysOnEgolist(Math.abs(moment(date1).diff(moment(date2), "days")));
    })();

    if (daysOnEgolist.toString()[daysOnEgolist.toString().length - 1] === 1) {
      setDaysText("День");
    } else if (
        daysOnEgolist.toString()[daysOnEgolist.toString().length - 1] > 1 &&
        daysOnEgolist.toString()[daysOnEgolist.toString().length - 1] < 5
    ) {
      setDaysText("Дня")
    } else {
      setDaysText("Дней")
    }
  }

  return (
    <>
      {user ? (
        <div className={s.user_card}>
          <div className="h6 text-center">{user.status}</div>
          <div className={s.user_ava}>
            {user && user.avatar
                ? <img src={user.avatar} alt={user.name} />
                : <img src={Placeholder} alt="" />}
          </div>
          <div className="h5 text-center">{user.name}</div>
          <div className="h6 text-center">[автор]</div>
          <Rating rating={user.rating} />
          <div className={s.location}>
            <img src={Location} alt="" />
            <span>
              {userLocation.length ? userLocation : "город не указан"}
            </span>
          </div>
          <div className={s.days_on_egolist}>
            <span>{daysOnEgolist}</span><br />
            <span>{daysText} на EGOLIST</span>
          </div>
          <div className="h5 text-center">Жалобы 4</div>
          <div className="h5 text-center">Желания 54</div>
          <a className="btn text-center" href={`tel:+${user.phone}`}>
            {user.phone}
          </a>
          <a className="btn text-center" href={`mailto:${user.email}`}>
            {user.email}
          </a>
          {user && user.telegram && user.telegram !== 'null'
              ? <a className="btn text-center" href={user.telegram}>
            {user.telegram}
          </a> : null}
          {user && user.viber && user.viber !== 'null'
              ? <a className="btn text-center" href={user.viber}>
            {user.viber}
          </a> : null}
        </div>
      ) : (
        <div className={`text-center py-5`}>
          {loading ? (
            <div className="spinner-border text-primary" role="status">
              <span className="sr-only">Loading...</span>
            </div>
          ) : (
            <div className="h5 text-center py-5">
              Нет информации о пользователе...
            </div>
          )}
        </div>
      )}
    </>
  );
}
