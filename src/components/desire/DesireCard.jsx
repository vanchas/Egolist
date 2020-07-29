import React, { useState, useEffect } from "react";
import s from "./desire.module.scss";
import Heart from "../../assets/header/Heart.png";
import Libra from "../../assets/header/libra.png";
import Link from "next/link";
import { authenticationService } from "../../_services";
import Carousel from "./DesireCarousel";
import { addDesireToFavorites, getMyOffers } from "../../redux/actions/userActions";
import {connect} from "react-redux";

function DesireCard({ desire, addDesireToFavorites, getMyOffers, myOffers }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [allowToCreateOffers, setAllowToCreateOffers] = useState(false);
  const [message, setMessage] = useState(null);

  const allowToCreateOffersHandler = (userData) => {
    if (userData.active && !userData.activation_token_sms && !userData.activation_token_email) {
      if (myOffers, myOffers.length) {
        for (let ofr of myOffers) {
          if (ofr.desire_id === desire.id) {
            setMessage('Вы уже сделали предложение к этому лоту');
            setAllowToCreateOffers(false);
            break
          } else {
            setAllowToCreateOffers(true);
          }
        }
      } else {
        setAllowToCreateOffers(true);
      }
    } else if (!userData.active || userData.activation_token_sms || userData.activation_token_email) {
      setMessage("Чтобы создать предложение к лоту, нужно подтвердить свой емейл и телефон");
      setAllowToCreateOffers(false);
    } else {
      if (myOffers, myOffers.length) {
        for (let ofr of myOffers) {
          if (ofr.desire_id === desire.id) {
            setMessage('Вы уже сделали предложение к этому лоту');
            setAllowToCreateOffers(false);
            break
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
    getMyOffers()
    const userData = authenticationService.currentUserValue;
    if (userData.token) {
      allowToCreateOffersHandler(userData.user);
      setUser(userData);
    }
    if (desire.id) setLoading(false);
    setTimeout(() => setLoading(false), 10000);
  }, [desire]);

  const setNewFavDesire = (id) => {
    addDesireToFavorites(id);
  };

  return (
    <>
      {desire.header && !loading ? (
        <div className={s.card}>
          <div className={s.main_image}>
            {desire.photo || desire.video ? (
              <Carousel
                desireId={desire.id}
                photo={JSON.parse(desire.photo)}
                video={desire.video}
              />
            ) : null}
          </div>
          <div className={s.card_info}>
            <div>
              <div>{desire.price} ГРН</div>
              <h4>{desire.header}</h4>
              <p>{desire.description}</p>
            </div>
            <div>
              <div className={s.card_control}>
                <span className="btn">
                  <img src={Libra} alt="" />
                </span>
                {user && user.token && user.user.id !== desire.user_id ? (
                  <span className="btn">
                    <img
                      src={Heart}
                      alt=""
                      onClick={() => setNewFavDesire(desire.id)}
                    />
                  </span>
                ) : null}
              </div>
              <div className={s.created_at}>
                {desire.created_at &&
                  desire.created_at
                    .split("T")[0]
                    .split("-")
                    .reverse()
                    .join(".")}
              </div>
              <div className={s.views}>Просмотров {desire.views}</div>
              <div className={s.categories}>
                {desire.category && desire.category.length
                  ? desire.category.map((c, i) => <span key={i}>{c.name}</span>)
                  : null}
              </div>
              {user && user.token && user.user.id !== desire.user_id && allowToCreateOffers ? (
                <Link
                  href={{
                    pathname: "/addOffer",
                    query: { desire_id: desire.id },
                  }}
                >
                  <a className={s.add_offer_btn}>Добавить предложение</a>
                </Link>
              ) : message ?
                  <div className={`text-center h6`}>{message}</div> : null}
            </div>
          </div>
        </div>
      ) : (
        <div className={`text-center py-5`}>
          {loading ? (
            <div className="spinner-border text-primary" role="status">
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
  myOffers: state.user.myOffers
});

const mapDispatchToProps = {
  addDesireToFavorites,
  getMyOffers
};

export default connect(mapStateToProps, mapDispatchToProps)(DesireCard);
