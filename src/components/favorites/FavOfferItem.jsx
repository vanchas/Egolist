import React, { useState } from "react";
import Location from "../../assets/sidebar/Location.png";
import s from "./fav.module.scss";
import Rating from "../helpers/Rating";
import Carousel from "../helpers/Carousel";
import {showSuccess} from "../../redux/actions/actions";

export default function FavOfferItem({ deleteFavorite, post }) {
  const [stateLoading, setStateLoading] = useState(false);

  const deleteFormFav = (e, id) => {
    e.preventDefault();
    setStateLoading(true);
    deleteFavorite(id);
    showSuccess("Предложение удалено из избранного");
  };

  return (
    <li className={s.card}>
      <div className={s.card_image}>
        {post.sentense.photo || post.sentense.video ? (
          <Carousel
            desireId={post.sentense.desire_id}
            photo={JSON.parse(post.sentense.photo)}
            video={post.sentense.video}
          />
        ) : null}
      </div>

      <div className={s.card_info_block}>
        <h5>{post.sentense.header}</h5>
        <p>{post.sentense.description}</p>
        <div className={s.card_info_block_footer}>
          <div>
            {post.sentense.user && (
              <>
                <span className={s.elips}></span>
                <span>{post.sentense.user.name}</span>
              </>
            )}
          </div>
          <div>
            {post.sentense.region && (
              <>
                <img src={Location} alt="" className={s.location_img} />
                <span>{post.sentense.region.name_ru}</span>
              </>
            )}
          </div>
          <div>
            <Rating ratign={post.sentense.rating} />
          </div>
        </div>
      </div>

      <div className={s.card_control_block}>
        <div className={s.price}>{post.sentense.price} ГРН</div>
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
