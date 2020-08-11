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
import { connect } from "react-redux";
import { addOfferToComparison } from "../../redux/actions/userActions";

function MainOffersListLot({
  offer,
  addOfferToComparison,
  addOfferToFavorites,
}) {
  const [showToast, setShowToast] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [loadingComparison, setLoadingComparison] = useState(false);
  const router = useRouter();

  const toastHandler = (e) => {
    e.preventDefault();
    setShowToast(!showToast);
  };

  useEffect(() => {
    const userData = authenticationService.currentUserValue;
    if (userData.token) setUser(userData);
    setTimeout(() => setLoadingComparison(false), 3000)
  }, [loadingComparison]);

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
                  {loadingComparison ? (
                    <div className="spinner-border text-warning" role="status">
                      <span className="sr-only">Loading...</span>
                    </div>
                  ) : (
                    <span
                      onClick={() => {
                        setLoadingComparison(true)
                        addOfferToComparison(offer.id);
                      }}
                    >
                      <img src={Libra} alt="" />
                    </span>
                  )}
                  {user.user.id !== offer.user_id && (
                    <span onClick={() => likeClickHandler(offer.id)}>
                      <img src={Heart} alt="" />
                    </span>
                  )}
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
                  {user && user.user && user.user.id === offer.user_id ? (
                    <Link
                      href={{
                        pathname: "/update-offer",
                        query: { id: offer.id, desire_id: offer.desire_id },
                      }}
                    >
                      <a>Изменить</a>
                    </Link>
                  ) : null}
                  <span>
                    <ReportModal
                      userId={offer.user_id}
                      setShowToast={setShowToast}
                    />
                  </span>
                </div>
              )}
            </>
          )}
        </div>
        <div className={s.lot_img_holder}>
          {offer.photo || offer.video ? (
            <Carousel
              desireId={offer.desire_id}
              offerId={offer.id}
              photo={JSON.parse(offer.photo)}
              video={offer.video}
            />
          ) : (
            <Link href={{ pathname: "/desire", query: { id: offer.desire_id, offer: offer.id } }}>
              <a className={`w-100 h-100`} />
            </Link>
          )}
        </div>
      </div>
      <div className={s.card_info}>
        <div className={s.card_elipse} />
        <h5 className="h6 font-weight-bold">
          <Link href={{ pathname: "/desire", query: { id: offer.desire_id, offer: offer.id } }}>
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

const mapStateToProps = (state) => ({});
const mapDispatchToProps = {
  addOfferToComparison,
};
export default connect(mapStateToProps, mapDispatchToProps)(MainOffersListLot);
