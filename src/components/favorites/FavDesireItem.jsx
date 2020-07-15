import React, { useEffect, useState } from "react";
import Location from "../../assets/sidebar/Location.png";
import s from "./fav.module.scss";
import Carousel from "../helpers/Carousel";

export default function FavDesireItem({ showSuccess, deleteFavorite, post }) {
  const [stateLoading, setStateLoading] = useState(false);

  const deleteFormFav = (e, id) => {
    e.preventDefault();
    setStateLoading(true);
    deleteFavorite(id);
    showSuccess("Желание удалено из избранного");
  };

  return (
    <li className={s.card}>
      <div className={s.card_image}>
        {post.desire.photo || post.desire.video ? (
          <Carousel
            desireId={post.desire.id}
            photo={JSON.parse(post.desire.photo)}
            video={post.desire.video}
          />
        ) : null}
      </div>

      <div className={s.card_info_block}>
        <h5>{post.desire.header}</h5>
        <p>{post.desire.description}</p>
        <div className={s.card_info_block_footer}>
          <div>
            {post.desire.user && (
              <>
                <span className={s.elips}></span>
                <span>{post.desire.user.name}</span>
              </>
            )}
          </div>
          <div>
            <img src={Location} alt="" className={s.location_img} />
            {post.desire.region && (
              <>
                <span>{post.desire.region.name_ru}</span>
              </>
            )}
          </div>
        </div>
      </div>

      <div className={s.card_control_block}>
        <div className={s.price}>{post.desire.price} ГРН</div>
        {stateLoading ? (
          <div className="spinner-border text-secondary" role="status">
            <span className="sr-only">Loading...</span>
          </div>
        ) : (
          <div
            className={`btn ${s.post}`}
            onClick={(e) => deleteFormFav(e, post.id)}
          >
            Убрать из избранных
          </div>
        )}
      </div>
    </li>
  );
}
