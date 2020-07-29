import React, { useEffect, useState } from "react";
import Location from "../../assets/sidebar/Location.png";
import Burger from "../../assets/header/burger.png";
import Heart from "../../assets/header/Heart.png";
import Libra from "../../assets/header/libra.png";
import s from "./offers.module.scss";
import Link from "next/link";
import Rating from "../helpers/Rating";
import ReportModal from "../helpers/ReportModal";
import Carousel from "../helpers/Carousel";
import { authenticationService } from "../../_services/authentication.service";

export default function OffersItem({
  offer,
  locations,
  showSuccess,
  addOfferToFavorites,
}) {
  const [userLocation, setUserLocation] = useState("");
  const [showToast, setShowToast] = useState(false);
  const [user, setUser] = useState(null);

  const toastHandler = (e) => {
    e.preventDefault();
    setShowToast(!showToast);
  };

  useEffect(() => {
    const userData = authenticationService.currentUserValue;
    if (userData && userData.user) setUser(userData);
    locations.forEach((loc) => {
      if (offer.user && loc.id === offer.user.region_id) {
        setUserLocation(loc.name_ru);
      }
    });
  }, []);

  const addToFav = (id) => {
    addOfferToFavorites(id);
    showSuccess("Предложение добавлено в избранные");
  };

  return (
    <li className={s.card}>
      {offer.user && (
        <>
          <div className={s.card_image}>
            {offer.photo || offer.video ? (
              <Carousel
                desireId={offer.desire_id}
                photo={JSON.parse(offer.photo)}
                video={offer.video}
              />
            ) : null}
          </div>

          <div className={s.card_info_block}>
            <h5>{offer.header}</h5>
            <p>{offer.description}</p>
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
            <div className={s.card_info_block_footer}>
              <div>
                <span className={s.elips}></span>
                <span>{offer.user.name}</span>
              </div>
              <div>
                <img src={Location} alt="" className={s.location_img} />
                <span>{userLocation}</span>
              </div>
              <div>
                <Rating rating={offer.rating} />
              </div>
            </div>
          </div>

          <div className={s.card_control_block}>
            <div className={s.card_control_header}>
              <div>
                <span>
                  <img src={Libra} alt="" />
                </span>
                {user && user.user && user.user.id !== offer.user_id ? (
                  <span onClick={() => addToFav(offer.id)}>
                    <img src={Heart} alt="" />
                  </span>
                ) : null}
              </div>
              <span onClick={(e) => toastHandler(e)}>
                <img src={Burger} alt="" />
              </span>
              {showToast && (
                <div className={`${s.toast}`}>
                  {user && user.user && user.user.id === offer.user_id ? (
                    <Link
                      href={{
                        pathname: "/updateOffer",
                        query: { id: offer.id, desire_id: offer.desire_id },
                      }}
                    >
                      <a>Изменить</a>
                    </Link>
                  ) : null}
                  <ReportModal
                    userId={offer.user_id}
                    setShowToast={setShowToast}
                  />
                </div>
              )}
            </div>
            <div className={s.price}>{offer.price} ГРН</div>
          </div>
        </>
      )}
    </li>
  );
}
