import React, { useState, useEffect } from "react";
import s from "./desire.module.scss";
import Heart from "../../assets/header/Heart.png";
import Burger from "../../assets/header/burger-white.png";
import Link from "next/link";
import { authenticationService } from "../../_services";
import SlickSlider from "../helpers/SlickSlider";
import {
  addDesireToFavorites,
  getMyOffers,
} from "../../redux/actions/userActions";
import { connect } from "react-redux";
import Placeholder from "../../assets/lot/placeholder-vertical.jpg";
import formatNumber from "../../utils/format-price-string";
import formatDate from "../../utils/format-date-string";
import moment from "moment";
import ReportModal from "../helpers/ReportModal";
import Spinner from "../helpers/Spinner";

function DesireCard({ desire = null, addDesireToFavorites, getMyOffers, myOffers }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [allowToCreateOffers, setAllowToCreateOffers] = useState(false);
  const [message, setMessage] = useState(null);
  const [isNew, setIsNew] = useState(false);
  const [showToast, setShowToast] = useState(false);

  const allowToCreateOffersHandler = (userData) => {
    // activation_token_email:
    // activation_token_sms:
    if (!userData.activation_token_email && !userData.activation_token_sms) {
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
    } else {
      setAllowToCreateOffers(false);
      setMessage(
        "Чтобы создать предложение к лоту, нужно подтвердить свой емейл и телефон"
      );
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
      {desire && !loading ? (
        <div className={s.card}>
          <div className={s.main_image}>
            {desire.photo ? (
              <SlickSlider photo={JSON.parse(desire.photo)} height={"30em"} />
            ) : (
              <img src={Placeholder} alt={``} />
            )}
          </div>
          <div className={s.card_info}>
            <div className={s.card_info_header}>
              <div className={s.price}>
                {desire.price ? (
                  <>
                    {formatNumber(desire.price)} <span>ГРН</span>
                  </>
                ) : null}
              </div>
              {user &&
              user.token &&
              user.user.id !== desire.user_id &&
              allowToCreateOffers ? (
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
                      <div className={s.toast_item}>
                        <Link
                          href={{
                            pathname: "/create-offer",
                            query: { desire_id: desire.id },
                          }}
                        >
                          <a className={s.add_offer_btn}>Сделать предложение</a>
                        </Link>
                      </div>
                      <div className={s.toast_item}>
                        <ReportModal
                          userId={desire.user_id}
                          setShowToast={setShowToast}
                        />
                      </div>
                    </div>
                  )}
                </div>
              ) : message ? (
                <small>{message}</small>
              ) : null}
            </div>
            <div>
              <h3 className={`text-white`}>{desire.header}</h3>
              <p>{desire.description}</p>
            </div>
            <div className={s.date}>
              {desire.created_at && formatDate(desire.created_at)}
            </div>
          </div>

          <div className={s.card_control}>
            <p>ЖЕЛАНИЕ</p>
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
              {desire.category && desire.category.length ? (
                <>
                  <span>{desire.category[0].name}</span>
                  {desire.category[1] && <span>{desire.category[1].name}</span>}
                </>
              ) : null}
            </div>
          </div>
        </div>
      ) : (
        <div className={`text-center py-5`}>
          {loading ? (
            <Spinner color={`secondary`} />
          ) : (
            <div className="h5 text-center text-white py-5">
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
