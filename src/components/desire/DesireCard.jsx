import React, { useState, useEffect } from "react";
import s from "./desire.module.scss";
import Heart from "../../assets/header/Heart.png";
import Libra from "../../assets/header/libra.png";
import Burger from "../../assets/header/burger-white.png";
import Link from "next/link";
import { authenticationService } from "../../_services";
import Carousel from "./DesireCarousel";
import {
  addDesireToFavorites,
  getMyOffers,
} from "../../redux/actions/userActions";
import { connect } from "react-redux";
import Placeholder from "../../assets/lot/placeholder-vertical.jpg";
import formatNumber from "../../utils/format-price-string";
import formatDate from "../../utils/format-date-string";
import moment from "moment";

function DesireCard({ desire, addDesireToFavorites, getMyOffers, myOffers }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [allowToCreateOffers, setAllowToCreateOffers] = useState(false);
  const [message, setMessage] = useState(null);
  const [isNew, setIsNew] = useState(false);
  const [showToast, setShowToast] = useState(false);

  const allowToCreateOffersHandler = (userData) => {
    if (
      userData.active &&
      !userData.activation_token_sms &&
      !userData.activation_token_email
    ) {
      if (myOffers && myOffers.length) {
        for (let ofr of myOffers) {
          if (ofr.desire_id === desire.id) {
            setMessage("Вы уже сделали предложение к этому лоту");
            setAllowToCreateOffers(false);
            break;
          } else {
            setAllowToCreateOffers(true);
          }
        }
      } else {
        setAllowToCreateOffers(true);
      }
    } else if (
      !userData.active ||
      userData.activation_token_sms ||
      userData.activation_token_email
    ) {
      setMessage(
        "Чтобы создать предложение к лоту, нужно подтвердить свой емейл и телефон"
      );
      setAllowToCreateOffers(false);
    } else {
      if (myOffers && myOffers.length) {
        for (let ofr of myOffers) {
          if (ofr.desire_id === desire.id) {
            setMessage("Вы уже сделали предложение к этому лоту");
            setAllowToCreateOffers(false);
            break;
          } else {
            setAllowToCreateOffers(true);
          }
        }
      } else {
        setAllowToCreateOffers(true);
      }
    }
  };

  useEffect(() => {
    isNewChecker(desire.created_at);
    getMyOffers();
    const userData = authenticationService.currentUserValue;
    if (userData.token) {
      allowToCreateOffersHandler(userData.user);
      setUser(userData);
    }
    if (desire.id) setLoading(false);
    setTimeout(() => setLoading(false), 10000);
  }, [desire]);

  const isNewChecker = (date) => {
    const date1 = moment(date)._i;
    const date2 = moment();
    const days = Math.abs(moment(date1).diff(moment(date2), "days"));
    if (days < 2) setIsNew(true);
  };

  return (
    <>
      {desire.header && !loading ? (
        <div className={s.card}>
          <div className={s.main_image}>
            {desire.photo ? (
              <img src={JSON.parse(desire.photo)[0]} alt={``} />
            ) : (
              <img src={Placeholder} alt={``} />
            )}
            {/*{desire.photo || desire.video ? (*/}
            {/*  <Carousel*/}
            {/*    desireId={desire.id}*/}
            {/*    photo={JSON.parse(desire.photo)}*/}
            {/*    video={desire.video}*/}
            {/*  />*/}
            {/*) : null}*/}
          </div>
          <div className={s.card_info}>
            <div className={s.card_info_header}>
              <div className={s.price}>
                {formatNumber(desire.price)} <span>ГРН</span>
              </div>
              <div className={s.toast_parrent}>
                {!showToast ? (
                  <img
                    src={Burger}
                    alt={``}
                    onClick={() => setShowToast(!showToast)}
                  />
                ) : (
                  <span
                    onClick={() => setShowToast(!showToast)}
                    className={s.active_toast_btn}
                  >
                    &#x269F;
                  </span>
                )}
                {showToast && (
                  <div className={`shadow ${s.toast}`}>
                    {/*{user &&*/}
                    {/*user.token &&*/}
                    {/*user.user.id !== desire.user_id &&*/}
                    {/*allowToCreateOffers ? (*/}
                      <span>
                        <Link
                          href={{
                            pathname: "/create-offer",
                            query: { desire_id: desire.id },
                          }}
                        >
                          <a className={s.add_offer_btn}>
                            Добавить предложение
                          </a>
                        </Link>
                      </span>
                    {/*// ) : message ? (*/}
                    {/*//   <div className={`text-center h6`}>{message}</div>*/}
                    {/*) : null}*/}
                    <span>qwerty</span>
                    <span>qwerty</span>
                  </div>
                )}
              </div>
            </div>
            <div>
              <h3>{desire.header}</h3>
              <p>{desire.description}</p>
            </div>
            <div className={s.date}>
              {desire.created_at && formatDate(desire.created_at)}
            </div>
            {/*<div>*/}
            {/*  <div>{desire.price} ГРН</div>*/}
            {/*  <h4>{desire.header}</h4>*/}
            {/*  <p>{desire.description}</p>*/}
            {/*</div>*/}
            {/*<div>*/}
            {/*  <div className={s.card_control}>*/}
            {/*<span className="btn">*/}
            {/*  <Link href={`/comparison`}>*/}
            {/*    <a>*/}
            {/*      <img src={Libra} alt="" />*/}
            {/*    </a>*/}
            {/*  </Link>*/}
            {/*</span>*/}
            {/*    {user && user.token && user.user.id !== desire.user_id ? (*/}
            {/*      <span className="btn">*/}
            {/*        <img*/}
            {/*          src={Heart}*/}
            {/*          alt=""*/}
            {/*          onClick={() => setNewFavDesire(desire.id)}*/}
            {/*        />*/}
            {/*      </span>*/}
            {/*    ) : null}*/}
            {/*  </div>*/}
            {/*  <div className={s.created_at}>*/}
            {/*    {desire.created_at &&*/}
            {/*      new Date(desire.created_at).getDate() +*/}
            {/*        "." +*/}
            {/*        (new Date(desire.created_at).getMonth() + 1) +*/}
            {/*        "." +*/}
            {/*        new Date(desire.created_at).getFullYear()}*/}
            {/*  </div>*/}
            {/*  <div className={s.views}>Просмотров {desire.views}</div>*/}
            {/*  <div className={s.categories}>*/}
            {/*    {desire.category && desire.category.length*/}
            {/*      ? desire.category.map((c, i) => <span key={i}>{c.name}</span>)*/}
            {/*      : null}*/}
            {/*  </div>*/}
            {/*  {user &&*/}
            {/*  user.token &&*/}
            {/*  user.user.id !== desire.user_id &&*/}
            {/*  allowToCreateOffers ? (*/}
            {/*    <Link*/}
            {/*      href={{*/}
            {/*        pathname: "/create-offer",*/}
            {/*        query: { desire_id: desire.id },*/}
            {/*      }}*/}
            {/*    >*/}
            {/*      <a className={s.add_offer_btn}>Добавить предложение</a>*/}
            {/*    </Link>*/}
            {/*  ) : message ? (*/}
            {/*    <div className={`text-center h6`}>{message}</div>*/}
            {/*  ) : null}*/}
            {/*</div>*/}
          </div>

          <div className={s.card_control}>
            <p>ЖЕЛАНИЕ</p>
            {/*<div className={s.com}>*/}
            {/*  <img src={Libra} alt={``} />*/}
            {/*  <span>В сравнение</span>*/}
            {/*</div>*/}
            <div
              className={s.fav}
              onClick={() => addDesireToFavorites(desire.id)}
            >
              <img src={Heart} alt={``} />
              <span>В избранное</span>
            </div>
            <div className={s.views}>
              <i className="far fa-eye" />
              <span>{desire.views}</span>
            </div>
            <div className={s.categories}>
              {!isNew && <span>Новое</span>}
              <span>Категория 1</span>
              <span>Категория 2</span>
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
              Нет информации по желанию...
            </div>
          )}
        </div>
      )}
    </>
  );
}

const mapStateToProps = (state) => ({
  myOffers: state.user.myOffers,
});

const mapDispatchToProps = {
  addDesireToFavorites,
  getMyOffers,
};

export default connect(mapStateToProps, mapDispatchToProps)(DesireCard);
