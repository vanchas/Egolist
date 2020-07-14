import React, { useEffect, useState } from "react";
import Location from "../../assets/sidebar/Location.png";
import s from "./fav.module.scss";
import Success from "../helpers/Success";

export default function FavDesires({
  showSuccess,
  success,
  favoritePosts,
  deleteFavorite,
  locations,
  cities,
  getCities,
    loading,
    setLoading
}) {

  useEffect(() => {
    if (favoritePosts && favoritePosts.length) setLoading(false);
    setTimeout(() => setLoading(false), 5000);
  }, [loading, setLoading]);

  const deleteFormFav = (e, id) => {
    e.preventDefault();
    deleteFavorite(id);
    showSuccess("Желание удалено из избранного");
  };

  return (
    <ul className={s.fav_desires_list}>
      {success && <Success />}
      {favoritePosts && favoritePosts.length ? (
        favoritePosts.map((post, i) => {
          if (post.desire) {
            return (
              <li key={i} className={s.card}>
                <div className={s.card_image}>
                  {post.desire.photo && post.desire.photo.length ? (
                    <img src={JSON.parse(post.desire.photo)[0]} alt="" />
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
                  <div
                    className={`btn ${s.post}`}
                    onClick={(e) => deleteFormFav(e, post.id)}
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
            <div className="py-5 text-center h5">Нет избанных желаний...</div>
          )}
        </div>
      )}
    </ul>
  );
}
