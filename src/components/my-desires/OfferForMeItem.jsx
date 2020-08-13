import React, { useState, useEffect } from "react";
import s from "./offers-for-me.module.scss";
import Link from "next/link";
import { connect } from "react-redux";
import {
  addOfferToComparison,
  addOfferToFavorites,
  deleteOffer,
  hideShowOffer,
} from "../../redux/actions/userActions";
import Placeholder from "../../assets/lot/placeholder-vertical.jpg";
import formatNumber from "../../utils/format-price-string";
import UserPlaceholder from "../../assets/sidebar/user.jpeg";
import Libra from "../../assets/header/libra.png";
import Heart from "../../assets/header/Heart.png";
import Burger from "../../assets/header/burger-white.png";
import ReportModal from "../helpers/ReportModal";
import OfferRating from "../helpers/OfferRating";

function OfferForMeItem({
  offer,
  locations,
  addOfferToComparison,
  addOfferToFavorites,
}) {
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
    <div className={s.card}>
      <div
        className={`${s.card_image} ${!offer.is_active ? s.disableColor : ""}`}
      >
        {offer.photo ? (
          // <Carousel
          //   desireId={desire.id}
          //   photo={JSON.parse(desire.photo)}
          //   video={desire.video}
          // />
          <img src={JSON.parse(offer.photo)[0]} alt={``} />
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
            <span>{region}</span>
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
        {offer.is_active ? (
          <div
            className={`${!offer.is_active ? s.disableColor : ""} ${
              s.card_footer_content
            }`}
          >
            <div className={`d-flex align-items-center`}>
              <div onClick={() => addOfferToComparison(offer.id)}>
                <img src={Libra} alt={``} />
                <span>В сравнение</span>
              </div>
              <div onClick={() => addOfferToFavorites(offer.id)}>
                <img src={Heart} alt={``} />
                <span>В избранное</span>
              </div>
            </div>
            <div onClick={(e) => toastHandler(e)}>
              {!showToast ?
                <img src={Burger} alt={``}/>
                : <span className={s.active_burger}>&#x269F;</span>}
            </div>

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
        ) : (
          <div className={s.not_published}>НЕ ОПУБЛИКОВАНО</div>
        )}
      </div>
    </div>
    // <div>
    //   {offer.user && (
    //     <div className={s.card}>
    //       <div className={s.card_image}>
    //         {offer.photo || offer.video ? (
    //           <Carousel
    //             desireId={offer.id}
    //             photo={JSON.parse(offer.photo)}
    //             video={offer.video}
    //           />
    //         ) : <Link href={{ pathname: `/desire`, query: {id: offer.desire_id, offer: offer.id} }}><a className={`w-100 h-100`} /></Link>}
    //       </div>
    //
    //       <div className={s.card_info_block}>
    //         <h5>{offer.header}</h5>
    //         <p>{offer.description}</p>
    //         <div className={s.progress_bar}>
    //           <div className="progress border border-dark rounded">
    //             <div
    //               className="progress-bar bg-secondary rounded"
    //               role="progressbar"
    //               style={{ width: `${offer.rating}%` }}
    //               aria-valuenow={offer.rating}
    //               aria-valuemin={0}
    //               aria-valuemax={100}
    //             />
    //           </div>
    //           <span>{offer.rating}%</span>
    //         </div>
    //         <div className={s.card_info_block_footer}>
    //           <div>
    //             <span className={s.elips}></span>
    //             <span>{offer.user.name}</span>
    //           </div>
    //           <div>
    //             <img src={Location} alt="" className={s.location_img} />
    //             <span>{region}</span>
    //           </div>
    //           <div>
    //             <Rating rating={offer.rating} />
    //           </div>
    //         </div>
    //       </div>
    //
    //       <div className={s.card_control_block}>
    //         <div className={s.card_control_header}>
    //           <div>
    //             <span onClick={() => addOfferToComparison(offer.id)}>
    //               <img src={Libra} alt="" />
    //             </span>
    //             <span onClick={() => addOfferToFavorites(offer.id)}>
    //               <img src={Heart} alt="" />
    //             </span>
    //           </div>
    //           <span onClick={(e) => toastHandler(e)}>
    //             <img src={Burger} alt="" />
    //           </span>
    //
    //           {showToast && (
    //             <div className={`${s.toast}`}>
    //               <Link
    //                 href={{
    //                   pathname: "/comparison",
    //                   query: { id: offer.id },
    //                 }}
    //               >
    //                 <a className={`btn`}>
    //                   <span>Сравнить</span>
    //                 </a>
    //               </Link>
    //               <ReportModal
    //                 userId={offer.user_id}
    //                 setShowToast={setShowToast}
    //               />
    //             </div>
    //           )}
    //         </div>
    //         <div className={s.price}>{offer.price} ГРН</div>
    //         {/*<Link href={{ pathname: "/offer", query: { id: offer.id } }}><a className="text-dark btn">Открыть</a></Link>*/}
    //       </div>
    //     </div>
    //   )}
    // </div>
  );
}

const mapStateToProps = (state) => ({});
const mapDispatchToProps = {
  addOfferToComparison,
  addOfferToFavorites,
};
export default connect(mapStateToProps, mapDispatchToProps)(OfferForMeItem);
