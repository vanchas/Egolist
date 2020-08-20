import React, { useState } from "react";
import Location from "../../assets/sidebar/Location.png";
import s from "./fav.module.scss";
import Rating from "../helpers/Rating";
import Carousel from "../helpers/Carousel";
import { showSuccess } from "../../redux/actions/appActions";
import Link from "next/link";
import SlickSlider from "../helpers/SlickSlider";
import Placeholder from "../../assets/lot/placeholder-vertical.jpg";
import UserPlaceholder from "../../assets/sidebar/user.jpeg";
import OfferRating from "../helpers/OfferRating";
import formatNumber from "../../utils/format-price-string";
import Libra from "../../assets/header/libra.png";
import Burger from "../../assets/header/burger-white.png";
import ReportModal from "../helpers/ReportModal";
import InterestingLotsList from "../interesting-lots/interestingLotsList";
import { connect } from "react-redux";
import { addOfferToComparison } from "../../redux/actions/userActions";

function FavOfferItem({ deleteFavorite, post, addOfferToComparison }) {
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [compLoading, setCompLoading] = useState(false);
  const [showToast, setShowToast] = useState(false);

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

  const deleteFormFav = (e, id) => {
    e.preventDefault();
    setDeleteLoading(true);
    deleteFavorite(id, "offer");
    setTimeout(() => setDeleteLoading(false), 2000);
  };

  return (
    <li className={s.card}>
      <div
        className={`${s.card_image} ${
          !post.sentense.is_active ? s.disableColor : ""
        }`}
      >
        {post.sentense.photo ? (
          <SlickSlider height={'25em'} photo={JSON.parse(post.sentense.photo)} />
        ) : (
          <Link
            href={{
              pathname: `/desire`,
              query: { id: post.sentense.desire_id, offer: post.sentense.id },
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
              query: { id: post.sentense.desire_id, offer: post.sentense.id },
            }}
          >
            <a>{post.sentense.header}</a>
          </Link>
        </h5>
        <p>{post.sentense.description}</p>
        <div className={s.user_block}>
          <span
            className={`${!post.sentense.is_active ? s.disableColor : ""} ${
              s.elips
            }`}
          >
            {post.sentense.user.avatar ? (
              <img src={post.sentense.user.avatar} alt={``} />
            ) : (
              <img src={UserPlaceholder} alt={``} />
            )}
          </span>
          <span className={s.user_name}>{post.sentense.user.name}</span>
          <div className={s.location}>
            <i className="fas fa-map-marker-alt" />
            <span>
              {post.sentense.city ? post.sentense.city.name_ru : "не указано"}
            </span>
          </div>
        </div>
        <div className={s.progress_bar}>
          <div className="progress rounded">
            <div
              className="progress-bar rounded"
              role="progressbar"
              style={{ width: `${post.sentense.rating}%` }}
              aria-valuenow={post.sentense.rating}
              aria-valuemin={0}
              aria-valuemax={100}
            />
          </div>
          <span>
            <OfferRating rating={post.sentense.rating} />
            {post.sentense.rating}%
          </span>
        </div>
      </div>

      <div className={s.card_control_block}>
        <p className={!post.sentense.is_active ? "text-dark" : ""}>
          ПРЕДЛОЖЕНИЕ
        </p>
        <div className={s.price}>
          <span style={{ fontSize: "30px" }}>
            {formatNumber(parseInt(post.sentense.price))}
          </span>{" "}
          ГРН
        </div>
        <div className={s.open}>
          <Link
            href={{
              pathname: "/desire",
              query: { id: post.sentense.desire_id, offer: post.sentense.id },
            }}
          >
            <a>Открыть</a>
          </Link>
        </div>
        <div className={s.open} onClick={(e) => deleteFormFav(e, post.id)}>
          {deleteLoading ? (
            <div className="spinner-border text-secondary" role="status">
              <span className="sr-only">Loading...</span>
            </div>
          ) : (
            <span>Удалить</span>
          )}
        </div>
      </div>

      <div className={s.card_footer}>
        {post.sentense.is_active ? (
          <div
            className={`${!post.sentense.is_active ? s.disableColor : ""} ${
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
                  onClick={(e) => addToComp(e, post.sentense.id)}
                >
                  <img src={Libra} alt={``} />
                  <span>В сравнение</span>
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
                  userId={post.sentense.user_id}
                  setShowToast={setShowToast}
                />
              </div>
            )}
          </div>
        ) : (
          <div className={s.not_published}>НЕ ОПУБЛИКОВАНО</div>
        )}
      </div>
    </li>
    // <li className={s.card}>
    //   <div className={s.card_image}>
    //     {post.sentense.photo || post.sentense.video ? (
    //       <Carousel
    //         desireId={post.sentense.desire_id}
    //         photo={JSON.parse(post.sentense.photo)}
    //         video={post.sentense.video}
    //       />
    //     ) : <Link href={{pathname: `/desire`, query: {id: post.sentense.desire_id, offer: post.sentense.id}}}><a className={`h-100 w-100`}/></Link>}
    //   </div>
    //
    //   <div className={s.card_info_block}>
    //       <h5><Link href={{pathname: `/desire`, query: {id: post.sentense.desire_id, offer: post.sentense.id}}}>
    //           <a>{post.sentense.header}</a>
    //       </Link></h5>
    //     <p>{post.sentense.description}</p>
    //     <div className={s.card_info_block_footer}>
    //       <div>
    //         {post.sentense.user && (
    //           <>
    //             <span className={s.elips}></span>
    //             <span>{post.sentense.user.name}</span>
    //           </>
    //         )}
    //       </div>
    //       <div>
    //         {post.sentense.region && (
    //           <>
    //             <img src={Location} alt="" className={s.location_img} />
    //             <span>{post.sentense.region.name_ru}</span>
    //           </>
    //         )}
    //       </div>
    //       <div>
    //         <Rating ratign={post.sentense.rating} />
    //       </div>
    //     </div>
    //   </div>
    //
    //   <div className={s.card_control_block}>
    //     <div className={s.price}>{post.sentense.price} ГРН</div>
    //     {deleteLoading ? (
    //       <div className="spinner-border text-secondary" role="status">
    //         <span className="sr-only">Loading...</span>
    //       </div>
    //     ) : (
    //       <div
    //         className={`btn ${s.post}`}
    //         onClick={(e) => deleteFormFav(e, post.id)}
    //       >
    //         Убрать из избранных
    //       </div>
    //     )}
    //   </div>
    // </li>
  );
}

const mapStateToProps = (state) => ({});
const mapDispatchToProps = {
  addOfferToComparison,
};
export default connect(mapStateToProps, mapDispatchToProps)(FavOfferItem);
