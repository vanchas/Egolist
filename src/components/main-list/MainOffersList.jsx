import React, { useEffect, useState } from "react";
import s from "./offers-list.module.scss";
import MainOffersListLot from "./MainOffersListLot";

export default function MainOffersList({
  offers,
  addOfferToFavorites,
}) {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (offers && offers.length) {
      setLoading(false);
    } else setLoading(true)
    setTimeout(() => setLoading(false), 10000);
  }, [offers]);

  return (
    <div className={s.main_list_wrap}>
      <div className={s.main_list}>
        {offers && offers.length ? (
          <ul>
            {offers.map((offer, i) => (
              <li key={i}>
                <MainOffersListLot
                  addOfferToFavorites={addOfferToFavorites}
                  offer={offer}
                />
              </li>
            ))}
          </ul>
        ) : (
          <div className={`text-center py-5`}>
            {loading ? (
              <div className="spinner-grow text-secondary" role="status">
                <span className="sr-only">Loading...</span>
              </div>
            ) : (
              <div className="py-5 h5 text-center text-white">
                Нет активных предложений
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
