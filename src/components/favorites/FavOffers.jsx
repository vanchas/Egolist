import React, { useState, useEffect } from "react";
import Location from "../../assets/sidebar/Location.png";
import Stars from "../../assets/sidebar/stars.png";
import s from "./fav.module.scss";
import Rating from "../helpers/Rating";

export default function FavOffers({ favoritePosts, deleteFavorite }) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (favoritePosts && favoritePosts.length) setLoading(false);
    setTimeout(() => setLoading(false), 5000);
  }, []);

  return (
    <ul className={s.fav_desires_list}>
      {favoritePosts && favoritePosts.length ? (
        favoritePosts.map((post, i) => {
          if (post.sentense) {
            return (
              <li key={i} className={s.card}>
                <div className={s.card_image}>
                  {post.sentense.photo && post.sentense.photo.length ? (
                    <img src={JSON.parse(post.sentense.photo)[0]} alt="" />
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
                          <img
                            src={Location}
                            alt=""
                            className={s.location_img}
                          />
                          <span>{post.sentense.region.name_ru}</span>
                        </>
                      )}
                    </div>
                    <div>
                      <Rating ratign={post.sentense.rating} />
                      {/* <img src={Stars} alt="" className={s.stars_img} /> */}
                    </div>
                  </div>
                </div>

                <div className={s.card_control_block}>
                  <div className={s.price}>{post.sentense.price} ГРН</div>
                  <div
                    className={`btn ${s.post}`}
                    onClick={(e) => {
                      e.preventDefault();
                      deleteFavorite(post.id);
                    }}
                  >
                    Delete
                  </div>
                </div>
              </li>
            );
          }
        })
      ) : (
        <div className={`text-center py-5`}>
          {loading ? (
            <div className="spinner-border text-primary" role="status">
              <span className="sr-only">Loading...</span>
            </div>
          ) : (
            <div className="py-5 text-center h5">Нет избанных предложений...</div>
          )}
        </div>
      )}
    </ul>
  );
}
