import React, { useEffect, useState } from "react";
import Location from "../../assets/sidebar/Location.png";
import s from "./fav.module.scss";
import Success from "../helpers/Success";
import Carousel from "../helpers/Carousel";
import FavDesireItem from "./FavDesireItem";

export default function FavDesires({
  showSuccess,
  favoritePosts,
  deleteFavorite,
  loading,
  setLoading,
}) {
  useEffect(() => {
    if (favoritePosts && favoritePosts.length) setLoading(false);
    setTimeout(() => setLoading(false), 5000);
  }, [loading, setLoading]);

  return (
    <ul className={s.fav_desires_list}>
      {favoritePosts && favoritePosts.length ? (
        favoritePosts.map((post, i) => {
          if (post.desire) {
            return (
              <FavDesireItem
                showSuccess={showSuccess}
                key={i}
                post={post}
                deleteFavorite={deleteFavorite}
              />
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
