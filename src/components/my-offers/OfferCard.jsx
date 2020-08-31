import React, { useState } from "react";
import s from "./offers.module.scss";
import Burger from "../../assets/header/burger-white.png";
import InterestingLotsList from "../interesting-lots/interestingLotsList";
import Link from "next/link";
import { connect } from "react-redux";
import { addOfferToComparison } from "../../redux/actions/userActions";
import SlickSlider from "../helpers/SlickSlider";
import Placeholder from "../../assets/lot/placeholder-vertical.jpg";
import UserPlaceholder from "../../assets/sidebar/user.jpeg";
import OfferRating from "../helpers/OfferRating";
import formatNumber from "../../utils/format-price-string";
import Libra from "../../assets/header/libra.png";
import Router from "next/router";
import SpinnerGrow from "../helpers/SpinnerGrow";

function OfferCard({
  offer,
  hideShowOffer,
  deleteOffer,
  addOfferToComparison,
  isActive,
  currencies,
}) {
  const [showBottomBlock, setShowBottomBlock] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [compLoading, setCompLoading] = useState(false);
  const [hideLoading, setHideLoader] = useState(false);
  const [deleteLoading, setDeleteLoader] = useState(false);

  const toastHandler = (e) => {
    e.preventDefault();
    setShowToast(!showToast);
  };

  const addToComp = (e, id) => {
    e.preventDefault();
    setCompLoading(true);
    addOfferToComparison(id);
    setTimeout(() => setCompLoading(false), 3000);
  };

  const hideShowHandler = (id) => {
    setHideLoader(true);
    hideShowOffer(id);
    setTimeout(() => setHideLoader(false), 3000);
  };

  const deleteOfferHandler = (id) => {
    setDeleteLoader(true);
    deleteOffer(id);
    setTimeout(() => setDeleteLoader(false), 3000);
  };

  return (
    <div className={s.card}>
      <div
        className={`${s.card_image} ${!offer.is_active ? s.disableColor : ""}`}
      >
        {offer.photo ? (
          <SlickSlider height={"25em"} photo={JSON.parse(offer.photo)} />
        ) : (
          <Link
            href={{
              pathname: `/desire`,
              query: { id: offer.desire_id, offer: offer.id },
            }}
          >
            <a className={`w-100 h-100`}>
              <img src={Placeholder} alt={``} className={s.placeholder} />
            </a>
          </Link>
        )}
      </div>

      <div className={s.card_info_block}>
        <h5>
          <Link
            href={{
              pathname: "/desire",
              query: { id: offer.desire_id, offer: offer.id },
            }}
          >
            <a>{offer.header}</a>
          </Link>
        </h5>
        <p>{offer.description}</p>
        <div className={s.user_block}>
          <span
            className={`${!offer.is_active ? s.disableColor : ""} ${s.elips}`}
          >
            {offer.user.avatar ? (
              <img src={offer.user.avatar} alt={``} />
            ) : (
              <img src={UserPlaceholder} alt={``} />
            )}
          </span>
          <span className={s.user_name}>{offer.user.name}</span>
          <div className={s.location}>
            <i className="fas fa-map-marker-alt" />
            <span>{offer.city ? offer.city.name_ru : "не указано"}</span>
          </div>
        </div>
        <div
          className={`${!offer.is_active ? s.disableColor : ""} ${
            s.progress_bar
          }`}
        >
          <div className="progress rounded">
            <div
              className="progress-bar rounded"
              role="progressbar"
              style={{ width: `${offer.rating}%` }}
              aria-valuenow={offer.rating}
              aria-valuemin={0}
              aria-valuemax={100}
            />
          </div>
          <span>
            <OfferRating rating={offer.rating} />
            {offer.rating}%
          </span>
        </div>
      </div>

      <div className={s.card_control_block}>
        <p className={!offer.is_active ? "text-dark" : ""}>ПРЕДЛОЖЕНИЕ</p>
        <div className={s.price}>
          <span style={{ fontSize: "30px" }}>
            {formatNumber(parseInt(offer.price))}
          </span>{" "}
          {currencies &&
            currencies.map((cur, i) => {
              if (cur.id === offer.currency_id) {
                return cur.name;
              }
            })}
        </div>
        <div className={s.offer_btn}>
          <Link
            href={{
              pathname: "/desire",
              query: { id: offer.desire_id, offer: offer.id },
            }}
          >
            <a>Открыть</a>
          </Link>
        </div>
        <div className={s.offer_btn} onClick={() => hideShowHandler(offer.id)}>
          {hideLoading ? (
            <SpinnerGrow color={`secondary`} />
          ) : offer.is_active ? (
            "Скрыть"
          ) : (
            "Опубликовать"
          )}
        </div>
        <div
          className={s.offer_btn}
          onClick={() =>
            Router.push({ pathname: "/update-offer", query: { id: offer.id } })
          }
        >
          Изменить
        </div>
        <div
          className={s.offer_btn}
          onClick={() => deleteOfferHandler(offer.id)}
        >
          {deleteLoading ? <SpinnerGrow color={`secondary`} /> : "Удалить"}
        </div>
      </div>

      <div className={s.card_footer}>
        {offer.is_active ? (
          <div
            className={`${!offer.is_active ? s.disableColor : ""} ${
              s.card_footer_content
            }`}
          >
            <div className={`d-flex align-items-center`}>
              {compLoading ? (
                <div className={`px-4`}>
                  <div className="spinner-grow text-secondary" role="status">
                    <span className="sr-only">Loading...</span>
                  </div>
                </div>
              ) : (
                <div
                  className={s.card_footer_item}
                  onClick={(e) => addToComp(e, offer.id)}
                >
                  <img src={Libra} alt={``} />
                  <span>В сравнение</span>
                </div>
              )}
              <div
                className={s.card_footer_item}
                onClick={() => setShowBottomBlock(!showBottomBlock)}
              >
                {showBottomBlock ? (
                  <i className="far fa-hand-point-down" />
                ) : (
                  <i className="far fa-hand-point-right" />
                )}
                <span>Интересные желания</span>
              </div>
            </div>
            <div onClick={(e) => toastHandler(e)}>
              {!showToast ? (
                <img src={Burger} alt={``} className={`mr-3`} />
              ) : (
                <span className={s.active_burger}>&#x269F;</span>
              )}
            </div>

            {showToast && (
              <div className={`${s.toast}`}>
                <span>тут ничего нет</span>
              </div>
            )}
          </div>
        ) : (
          <div className={s.not_published}>НЕ ОПУБЛИКОВАНО</div>
        )}
      </div>

      {showBottomBlock ? <InterestingLotsList offerId={offer.id} /> : null}
    </div>
  );
}

const mapStateToProps = (state) => ({
  currencies: state.app.currencies,
});
const mapDispatchToProps = {
  addOfferToComparison,
};
export default connect(mapStateToProps, mapDispatchToProps)(OfferCard);
