import React, { useState } from "react";
import Location from "../../assets/sidebar/Location.png";
import s from "./fav.module.scss";
import Rating from "../helpers/Rating";
import Carousel from "../helpers/Carousel";
import {showSuccess} from "../../redux/actions/appActions";
import Link from "next/link";

export default function FavOfferItem({ deleteFavorite, post }) {
  const [deleteLoading, setDeleteLoading] = useState(false);

  const deleteFormFav = (e, id) => {
    e.preventDefault();
    setDeleteLoading(true);
    deleteFavorite(id, 'offer');
    setTimeout(() => setDeleteLoading(false), 2000)
    // showSuccess("Предложение удалено из избранного");
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
        ) : <Link href={{pathname: `/desire`, query: {id: post.sentense.desire_id, offer: post.sentense.id}}}><a className={`h-100 w-100`}/></Link>}
      </div>

      <div className={s.card_info_block}>
          <h5><Link href={{pathname: `/desire`, query: {id: post.sentense.desire_id, offer: post.sentense.id}}}>
              <a>{post.sentense.header}</a>
          </Link></h5>
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
        {deleteLoading ? (
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
