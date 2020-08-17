import React, { useState } from "react";
import Carousel from "../helpers/Carousel";
import Link from "next/link";
import s from "./comparison.module.scss";
import Location from "../../assets/sidebar/Location.png";
import Rating from "../helpers/Rating";
import Heart from "../../assets/header/Heart.png";
import { connect } from "react-redux";

import { SortableElement } from "react-sortable-hoc";
import {
  addOfferToFavorites,
  removeOfferFromComparison,
} from "../../redux/actions/userActions";
import { authenticationService } from "../../_services/authentication.service";
import SlickSlider from "../helpers/SlickSlider";
import Placeholder from "../../assets/lot/placeholder-vertical.jpg";
import UserPlaceholder from "../../assets/sidebar/user.jpeg";
import OfferRating from "../helpers/OfferRating";
import formatNumber from "../../utils/format-price-string";
import Libra from "../../assets/header/libra.png";
import Burger from "../../assets/header/burger-white.png";
import ReportModal from "../helpers/ReportModal";

const ComparisonItem = SortableElement(({ offer, addOfferToFavorites }) => {
  const [favLoading, setFavLoading] = useState(false)
  const [showToast, setShowToast] = useState(false)

  const addToFav = (e, id) => {
    e.preventDefault();
    setFavLoading(true);
    addOfferToFavorites(id);
    setTimeout(() => setFavLoading(false), 3000);
  };

  const toastHandler = (e) => {
    e.preventDefault();
    setShowToast(!showToast);
  };

  return (
    offer && (
      <div className={s.card}>
        <div
          className={`${s.card_image} ${
            !offer.is_active ? s.disableColor : ""
          }`}
        >
          {offer.photo ? (
            <SlickSlider photo={JSON.parse(offer.photo)} />
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
          <div className={s.progress_bar}>
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
            ГРН
          </div>
          <div className={s.open}>
            <Link
              href={{
                pathname: "/desire",
                query: { id: offer.desire_id, offer: offer.id },
              }}
            >
              <a>Открыть</a>
            </Link>
          </div>
        </div>

        <div className={s.card_footer}>
          <div
            className={`${!offer.is_active ? s.disableColor : ""} ${
              s.card_footer_content
            }`}
          >
            <div className={`d-flex align-items-center`}>
              {favLoading ? (
                <div className={`px-4`}>
                  <div className="spinner-grow text-secondary" role="status">
                    <span className="sr-only">Loading...</span>
                  </div>
                </div>
              ) : (
                <div
                  className={s.card_footer_item}
                  onClick={(e) => addToFav(e, offer.id)}
                >
                  <img src={Heart} alt={``} />
                  <span>В избранное</span>
                </div>
              )}
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
                <ReportModal
                  userId={offer.user_id}
                  setShowToast={setShowToast}
                />
              </div>
            )}
          </div>
        </div>
      </div>
      // <li className={`shadow ${s.list_item}`}>
      //   <div className={s.image_block}>
      //     {props.offer.photo || props.offer.video ? (
      //       <Carousel
      //         desireId={props.offer.desire_id}
      //         photo={JSON.parse(props.offer.photo)}
      //         video={props.offer.video}
      //       />
      //     ) : (
      //       <Link href={{pathname: `/desire`, query: { id: props.offer.desire_id, offer: props.offer.id }}}>
      //         <a className={`w-100 h-100`} />
      //       </Link>
      //     )}
      //   </div>
      //   <div className={s.content_block}>
      //     <h6 className={`h4`}>
      //       <b>{props.offer.header}</b>
      //     </h6>
      //     <div>
      //       Цена: {props.offer.price} грн
      //       <span>
      //         <Rating rating={props.offer.rating} />
      //       </span>
      //     </div>
      //     <p className={`m-0`}>Описание: {props.offer.description}</p>
      //     <div>
      //       <img src={Location} alt="" className={s.location_img} />
      //       {props.offer.region.name_ru}{" "}
      //       {props.offer.city && props.offer.city.name_ru !== "Не важно"
      //         ? ", " + props.offer.city.name_ru
      //         : null}
      //     </div>
      //   </div>
      //   <span
      //     className={s.remove_btn}
      //     onClick={() => props.removeOfferFromComparison(props.offer.id)}
      //   >
      //     X
      //   </span>
      //   {authenticationService.currentUserValue &&
      //   authenticationService.currentUserValue.token &&
      //   authenticationService.currentUserValue.user.id !==
      //     props.offer.user_id ? (
      //     <span
      //       className={s.favorite_btn}
      //       onClick={() => props.addOfferToFavorites(props.offer.id)}
      //     >
      //       <img src={Heart} alt="" />
      //     </span>
      //   ) : null}
      // </li>
    )
  );
});

const mapStateToProps = (state) => ({});
const mapDispatchToProps = {
  addOfferToFavorites,
  removeOfferFromComparison,
};
export default connect(mapStateToProps, mapDispatchToProps)(ComparisonItem);
