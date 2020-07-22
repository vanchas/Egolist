import React, {useState, useEffect} from "react";
import s from "./fav.module.scss";
import FavOfferItem from "./FavOfferItem";

export default function FavOffers({
                                      favoriteOffers,
                                      deleteFavorite,
                                      loading,
                                      setLoading,
                                  }) {

    useEffect(() => {
        if (favoriteOffers && favoriteOffers.length) setLoading(false);
        setTimeout(() => setLoading(false), 5000);
    }, [loading, setLoading]);

    return (
        <ul className={s.fav_desires_list}>
            {favoriteOffers && favoriteOffers.length ? (
                favoriteOffers.map((post, i) => {
                        return (
                            <FavOfferItem key={i} post={post} deleteFavorite={deleteFavorite}/>
                        );
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
