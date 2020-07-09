import React, { useEffect, useState } from "react";
import s from "./user.module.scss";
import Location from "../../assets/sidebar/Location.png";
import moment from "moment";
import Rating from "../helpers/Rating";

export default function UserCard({ user, locations }) {
  const [daysOnEgolist, setDaysOnEgolist] = useState(0);
  const [userLocation, setUserLocation] = useState("");
  const [loading, setLoading] = useState(true);
  const [daysText, setDaysText] = useState("Дней");

  useEffect(() => {
    if (user) {
      setLoading(false);
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
      locations.forEach((loc) => {
        if (loc.id === user.region_id) {
          setUserLocation(loc.name_ru);
        }
      });
    }
    setTimeout(() => setLoading(false), 5000);
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
  }, [user]);

  return (
    <>
      {user ? (
        <div className={s.user_card}>
          <div className="h6 text-center">{user.status}</div>
          <div className={s.user_ava}>
            {user.avatar && <img src={user.avatar} alt={user.name} />}
          </div>
          <div className="h5 text-center">{user.name}</div>
          <div className="h6 text-center">[author]</div>
          <Rating rating={user.rating} />
          <div className={s.location}>
            <img src={Location} alt="" />
            <span>
              {userLocation.length ? userLocation : "город не указан"}
            </span>
          </div>
          <div className={s.days_on_egolist}>
            <span>{daysOnEgolist}</span>
            <span>{daysText} на EGOLIST</span>
          </div>
          <div className="h5 text-center">Complaints 4</div>
          <div className="h5 text-center">Adds 54</div>
          <a className="btn text-center" href={`tel:+${user.phone}`}>
            {user.phone}
          </a>
          <a className="btn text-center" href={`mailto:${user.email}`}>
            {user.email}
          </a>
          <a className="btn text-center" href={user.telegram}>
            {user.telegram}
          </a>
          <a className="btn text-center" href={user.viber}></a>
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
