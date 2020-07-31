import React, { useState, useEffect } from "react";
import s from "./offers-for-me.module.scss";
import Location from "../../assets/sidebar/Location.png";
import Burger from "../../assets/header/burger.png";
import Heart from "../../assets/header/Heart.png";
import Libra from "../../assets/header/libra.png";
import Link from "next/link";
import Rating from "../helpers/Rating";
import ReportModal from "../helpers/ReportModal";
import { connect } from "react-redux";
import { addOfferToComparison, addOfferToFavorites } from "../../redux/actions/userActions";
import Carousel from "../helpers/Carousel";

function OfferForMeItem({ offer, locations, addOfferToComparison, addOfferToFavorites }) {
  const [region, setRegion] = useState("");
  const [showToast, setShowToast] = useState(false);

  const toastHandler = (e) => {
    e.preventDefault();
    setShowToast(!showToast);
  };

  useEffect(() => {
    if (locations && locations.length) {
      locations.map((loc) => {
        if (loc.id === offer.region_id) {
          setRegion(loc.name_ru);
        }
      });
    }
  }, [offer, locations]);

  return (
    <div>
      {offer.user && (
        <div className={s.card}>
          <div className={s.card_image}>
            {offer.photo || offer.video ? (
              <Carousel
                desireId={offer.id}
                photo={JSON.parse(offer.photo)}
                video={offer.video}
              />
            ) : <Link href={`/desire?id=${offer.id}`}><a className={`w-100 h-100`} /></Link>}
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
                <span>{region}</span>
              </div>
              <div>
                <Rating rating={offer.rating} />
              </div>
            </div>
          </div>

          <div className={s.card_control_block}>
            <div className={s.card_control_header}>
              <div>
                <span onClick={() => addOfferToComparison(offer.id)}>
                  <img src={Libra} alt="" />
                </span>
                <span onClick={() => addOfferToFavorites(offer.id)}>
                  <img src={Heart} alt="" />
                </span>
              </div>
              <span onClick={(e) => toastHandler(e)}>
                <img src={Burger} alt="" />
              </span>

              {showToast && (
                <div className={`${s.toast}`}>
                  <Link
                    href={{
                      pathname: "/comparison",
                      query: { id: offer.id },
                    }}
                  >
                    <a className={`btn`}>
                      <span>Сравнить</span>
                    </a>
                  </Link>
                  <ReportModal
                    userId={offer.user_id}
                    setShowToast={setShowToast}
                  />
                </div>
              )}
            </div>
            <div className={s.price}>{offer.price} ГРН</div>
            {/*<Link href={{ pathname: "/offer", query: { id: offer.id } }}><a className="text-dark btn">Открыть</a></Link>*/}
          </div>
        </div>
      )}
    </div>
  );
}

const mapStateToProps = (state) => ({});
const mapDispatchToProps = {
  addOfferToComparison,
  addOfferToFavorites
};
export default connect(mapStateToProps, mapDispatchToProps)(OfferForMeItem);
