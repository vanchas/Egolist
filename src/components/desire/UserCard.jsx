import React, { useEffect, useState } from "react";
import s from "./user.module.scss";
import Location from "../../assets/sidebar/Location.png";
import moment from "moment";
import Rating from "../helpers/Rating";
import Placeholder from "../../assets/old/user-placeholder.jpg";
import Messenger from "../../assets/social/messenger.png";
import Whatsup from "../../assets/social/whatsup.png";
import Telegram from "../../assets/social/telegram.png";
import Skype from "../../assets/social/skype.png";
import Mail from "../../assets/social/email.png";

export default function UserCard({ user, locations }) {
  const [daysOnEgolist, setDaysOnEgolist] = useState(0);
  const [userLocation, setUserLocation] = useState("");
  const [loading, setLoading] = useState(true);
  const [daysText, setDaysText] = useState("дней");

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
      const days = Math.abs(moment(date1).diff(moment(date2), "days"));
      if (days === 1) {
        setDaysText("день");
      } else if (days > 1 && days < 5) {
        setDaysText("ня");
      } else {
        setDaysText("дней");
      }
      setDaysOnEgolist(Math.abs(moment(date1).diff(moment(date2), "days")));
    })();
  };

  return (
    <>
      {user ? (
        <div className={s.user_card}>
          <div className={s.header}>
            <div className={s.user_ava}>
              {user && user.avatar ? (
                <img src={user.avatar} alt={user.name} />
              ) : (
                <img src={Placeholder} alt="" />
              )}
            </div>
            <div className={s.name}>{user.name.split(' ')[0]}</div>
            <div className={s.rating}>
              <Rating rating={user.rating} />
            </div>
          </div>

          <div className={s.content}>
            <div className={s.status}>{user.status}</div>
            <div className={s.location}>
              <img src={Location} alt="" />
              <span>{userLocation.length ? userLocation : "Не указано"}</span>
            </div>
            <div className={s.user_info}>
              <div className={s.days}>
                <span><b>{daysOnEgolist} </b> </span>
                <span>{daysText} на EGOLIST</span>
              </div>
              <div><b>{user.complaint_counter}</b> Жалоб</div>
              <div><b>{user.offer_counter}</b> Объявлений</div>
            </div>
            <div className={s.write_to_author}>Написать автору</div>
            <div className={s.links_title}>Медальки</div>
            <div className={s.links}>
              <a href={`tel:+${user.phone}`} target="_blank">
                <img src={Messenger} alt={``} />
                Messenger
              </a>
              <a href={`whatsapp://send?phone=${user.phone}`} target="_blank">
                <img src={Whatsup} alt={``} />
                Whatsup
              </a>
              <a href={`skype:${user.skype}?userinfo`} target="_blank">
                <img src={Skype} alt={``} />
                Skype
              </a>
              <a href={`https://telegram.im/${user.telegram}`} target="_blank">
                <img src={Telegram} alt={``} />
                Telegram
              </a>
              <a href={`mailto:${user.email}`} target="_blank">
                <img src={Mail} alt={``} />
                E-Mail
              </a>
            </div>
          </div>
        </div>
      ) : (
        <div className={`text-center py-5`}>
          {loading ? (
            <div className="spinner-border text-secondary" role="status">
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
