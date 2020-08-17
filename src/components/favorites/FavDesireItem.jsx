import React, { useEffect, useState } from "react";
import Location from "../../assets/sidebar/Location.png";
import s from "./fav.module.scss";
import Carousel from "../helpers/Carousel";
import Link from "next/link";
import SlickSlider from "../helpers/SlickSlider";
import Placeholder from "../../assets/lot/placeholder-vertical.jpg";
import UserPlaceholder from "../../assets/sidebar/user.jpeg";
import formatNumber from "../../utils/format-price-string";
import StatArrow from "../../assets/lot/stat-arrow.png";
import OffersForMe from "../my-desires/OffersForMe";
import Burger from "../../assets/header/burger-white.png";
import ReportModal from "../helpers/ReportModal";

export default function FavDesireItem({ deleteFavorite, post }) {
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [showToast, setShowToast] = useState(false);

  const toastHandler = (e) => {
    e.preventDefault();
    setShowToast(!showToast);
  };

  const deleteFormFav = (e, id) => {
    e.preventDefault();
    setDeleteLoading(true);
    deleteFavorite(id, "desire");
    setTimeout(() => setDeleteLoading(false), 2000);
    // showSuccess("Желание удалено из избранного");
  };

  return (
    <li className={s.card}>
      <div
        className={`${s.card_image} ${
          !post.desire.is_active ? s.disableColor : ""
        }`}
      >
        {post.desire.photo ? (
          <SlickSlider photo={JSON.parse(post.desire.photo)} />
        ) : (
          // <img src={JSON.parse(desire.photo)[0]} alt={``} />
          <Link href={{ pathname: `/desire`, query: { id: post.desire.id } }}>
            <a className={`w-100 h-100`}>
              <img src={Placeholder} alt={``} className={s.placeholder} />
            </a>
          </Link>
        )}
      </div>

      <div className={s.card_info_block}>
        <h5>
          <Link href={{ pathname: "/desire", query: { id: post.desire.id } }}>
            <a>{post.desire.header}</a>
          </Link>
        </h5>
        <p>{post.desire.description}</p>
        <div className={s.user_block}>
          <span
            className={`${!post.desire.is_active ? s.disableColor : ""} ${
              s.elips
            }`}
          >
            {post.desire.user.avatar ? (
              <img src={post.desire.user.avatar} alt={``} />
            ) : (
              <img src={UserPlaceholder} alt={``} />
            )}
          </span>
          <span className={s.user_name}>{post.desire.user.name}</span>
          <div className={s.location}>
            <i className="fas fa-map-marker-alt" />
            <span>
              {post.desire.city ? post.desire.city.name_ru : "не указано"}
            </span>
          </div>
        </div>
      </div>

      <div className={s.card_control_block}>
        <p className={!post.desire.is_active ? "text-dark" : ""}>ХОЧУ КУПИТЬ</p>
        <div className={s.price}>
          <span style={{ fontSize: "30px" }}>
            {formatNumber(parseInt(post.desire.price))}
          </span>{" "}
          ГРН
        </div>
        <div className={s.delete} onClick={(e) => deleteFormFav(e, post.id)}>
          {deleteLoading ? (
            <div className="spinner-border text-secondary" role="status">
              <span className="sr-only">Loading...</span>
            </div>
          ) : (
            "Убрать"
          )}
        </div>
      </div>

      <div className={s.card_footer}>
        {post.desire.is_active ? (
          <div
            className={`${!post.desire.is_active ? s.disableColor : ""} ${
              s.card_footer_content
            }`}
          >
            <span />
            <div className={s.toast_btn} onClick={(e) => toastHandler(e)}>
              {!showToast ? (
                <img src={Burger} alt={``} className={`mr-3`} />
              ) : (
                <span className={s.active_burger}>&#x269F;</span>
              )}
            </div>

            {showToast && (
              <div className={`${s.toast}`}>
                <ReportModal
                  userId={post.desire.user_id}
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
    //     {post.desire.photo || post.desire.video ? (
    //       <Carousel
    //         desireId={post.desire.id}
    //         photo={JSON.parse(post.desire.photo)}
    //         video={post.desire.video}
    //       />
    //     ) : <Link href={`/desire?=id${post.desire.id}`}><a className={`h-100 w-100`}></a></Link>}
    //   </div>
    //
    //   <div className={s.card_info_block}>
    //     <h5>
    //         <Link href={`/desire?id=${post.desire.id}`}>
    //             <a>{post.desire.header}</a>
    //         </Link>
    //     </h5>
    //     <p>{post.desire.description}</p>
    //     <div className={s.card_info_block_footer}>
    //       <div>
    //         {post.desire.user && (
    //           <>
    //             <span className={s.elips}></span>
    //             <span>{post.desire.user.name}</span>
    //           </>
    //         )}
    //       </div>
    //       <div>
    //         <img src={Location} alt="" className={s.location_img} />
    //         {post.desire.region && (
    //           <>
    //             <span>{post.desire.region.name_ru}</span>
    //           </>
    //         )}
    //       </div>
    //     </div>
    //   </div>
    //
    //   <div className={s.card_control_block}>
    //     <div className={s.price}>{post.desire.price} ГРН</div>
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
    //  </div>
    // </li>
  );
}
