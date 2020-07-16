import React, { useState, useEffect } from "react";
import Link from "next/link";
import s from "./offers-list.module.scss";
import Burger from "../../assets/header/burger.png";
import Heart from "../../assets/header/Heart.png";
import Libra from "../../assets/header/libra.png";
import { authenticationService } from "../../_services/authentication.service";
import { useRouter } from "next/router";
import Carousel from "../helpers/Carousel";
import ReportModal from "../helpers/ReportModal";

export default function MainOffersListLot({
  offer,
  addOfferToFavorites,
  success,
}) {
  const [showToast, setShowToast] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const toastHandler = (e) => {
    e.preventDefault();
    setShowToast(!showToast);
  };

  useEffect(() => {
    const user = authenticationService.currentUserValue;
    if (user.token) setUser(user);
  }, []);

  const likeClickHandler = (id) => {
    if (!user.token) {
      router.push("login");
    } else {
      setLoading(true);
      addOfferToFavorites(id);
      setTimeout(() => setLoading(false), 3000);
    }
  };

  return (
    <div className={s.card}>
      <div className={s.card_header}>
        <div className={s.card_header_control}>
          {user && (
            <>
              {!loading ? (
                <>
                  <span>
                    <img src={Libra} alt="" />
                  </span>
                  <span onClick={() => likeClickHandler(offer.id)}>
                    <img
                      src={Heart}
                      alt=""
                      style={
                        user.user.id === offer.user_id
                          ? { visibility: "hidden" }
                          : {}
                      }
                    />
                  </span>
                </>
              ) : (
                <div className="spinner-border text-warning" role="status">
                  <span className="sr-only">Loading...</span>
                </div>
              )}
              <span onClick={(e) => toastHandler(e)}>
                <img src={Burger} alt="" />
              </span>

              {showToast && (
                <div className={`${s.toast}`}>
                  <ReportModal
                    userId={offer.user_id}
                    setShowToast={setShowToast}
                  />
                </div>
              )}
            </>
          )}
        </div>
        <div className={s.lot_img_holder}>
          {offer.photo || offer.video ? (
            <Carousel
              desireId={offer.desire_id}
              photo={JSON.parse(offer.photo)}
              video={offer.video}
            />
          ) : <Link href={`/desire?id=${offer.desire_id}`}><a className={`w-100 h-100`}></a></Link>}
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
