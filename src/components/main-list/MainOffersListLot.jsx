import React, { useState, useEffect } from "react";
import Link from "next/link";
import s from "./offers-list.module.scss";
import Burger from "../../assets/header/burger.png";
import Heart from "../../assets/header/Heart.png";
import Libra from "../../assets/header/libra.png";
import Success from '../helpers/Success'
import { authenticationService } from "../../_services/authentication.service";
import { useRouter } from "next/router";
import Carousel from '../helpers/Carousel'

export default function MainOffersListLot({ offer, addOfferToFavorites, success }) {
  const [showToast, setShowToast] = useState(false);
  const [user, setUser] = useState(null);
  const router = useRouter();

  const toastHandler = (e) => {
    e.preventDefault();
    setShowToast(!showToast);
  };

  useEffect(() => {
    const user = authenticationService.currentUserValue;
    if (user.token) setUser(user);
  }, []);

  return (
    <div className={s.card}>
      <div>
        {/* {success && <Success />} */}
      </div>
      <div className={s.card_header}>
        <div className={s.card_header_control}>
          {user && <>
            <div>
              <span>
                <img src={Libra} alt="" />
              </span>
              <span onClick={() => {
                !user.token
                  ? router.push('login')
                  : addOfferToFavorites(offer.id)
              }}>
                <img src={Heart} alt="" style={
                  user.user.id === offer.user_id
                    ? { filter: 'invert(0.9)' } : {}
                } />
              </span>
            </div>
            <span onClick={(e) => toastHandler(e)}>
              <img src={Burger} alt="" />
            </span>

            {showToast && (
              <div className={`${s.toast}`}>
                <span>Report</span>
              </div>
            )}
          </>}
        </div>
        <div className={s.lot_img_holder}>
          {offer.photo || offer.video
            ? <Carousel
              desireId={offer.desire_id}
              photo={JSON.parse(offer.photo)}
              video={offer.video}
            />
            : null}
        </div>
      </div>
      <div className={s.card_info}>
        <div className={s.card_elipse}></div>
        <h5 className="h6 font-weight-bold">
          <Link href={{ pathname: "/desire", query: { id: offer.desire_id } }}>
            <a className="text-dark">{offer.header}</a>
          </Link>
        </h5>
        <span className={s.card_price}>{offer.price} ГРН</span>
        <div className={s.progress_bar}>
          <div className="progress border border-dark rounded">
            <div
              className="progress-bar bg-secondary rounded"
              role="progressbar"
              style={{ width: `${offer.rating}%` }}
              aria-valuenow={offer.rating}
              aria-valuemin={0}
              aria-valuemax={100}
            />
          </div>
          <span>{offer.rating}%</span>
        </div>
      </div>
    </div>
  );
}
