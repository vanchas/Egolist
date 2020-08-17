import React, {useEffect, useState} from "react";
import s from "./fav.module.scss";
import FavDesireItem from "./FavDesireItem";

export default function FavDesires({
                                       deleteFavorite,
                                       loading,
                                       setLoading,
                                       favoriteDesires
                                   }) {

    useEffect(() => {
        if (favoriteDesires && favoriteDesires.length) setLoading(false);
        setTimeout(() => setLoading(false), 5000);
    }, [loading, setLoading]);

    return (
        <ul className={s.fav_desires_list}>
            {favoriteDesires && favoriteDesires.length ? (
                favoriteDesires.map((post, i) => {
                    return (
                        <FavDesireItem
                            key={i}
                            post={post}
                            deleteFavorite={deleteFavorite}
                        />
                    );
                })
            ) : (
                <div className={`text-center py-5`}>
                    {loading ? (
                        <div className="spinner-border text-secondary" role="status">
                            <span className="sr-only">Loading...</span>
                        </div>
                    ) : (
                        <div className="py-5 text-white text-center h5">Нет избанных желаний...</div>
                    )}
                </div>
            )}
        </ul>
    );
}
