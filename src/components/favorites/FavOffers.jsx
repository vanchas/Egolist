import React, { useState, useEffect } from "react";
import s from "./fav.module.scss";
import FavOfferItem from "./FavOfferItem";

export default function FavOffers({
  favoritePosts,
  deleteFavorite,
}) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (favoritePosts && favoritePosts.length) setLoading(false);
    setTimeout(() => setLoading(false), 5000);
  }, [loading, setLoading]);

  return (
    <ul className={s.fav_desires_list}>
      {favoritePosts && favoritePosts.length ? (
        favoritePosts.map((post, i) => {
          if (post.sentense) {
            return (
              <FavOfferItem key={i} post={post} deleteFavorite={deleteFavorite} />
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
            <div className="py-5 text-center h5">
              Нет избанных предложений...
            </div>
          )}
        </div>
      )}
    </ul>
  );
}
