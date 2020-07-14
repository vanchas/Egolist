import React, { useEffect, useState } from "react";
import s from "./offers-list.module.scss";
import MainOffersListLot from "./MainOffersListLot";
import Success from "../helpers/Success";

export default function MainOffersList({
  offers,
  addOfferToFavorites,
  success,
}) {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (offers && offers.length) {
      setLoading(false);
    } else setLoading(true)
    setTimeout(() => setLoading(false), 5000);
  }, [offers]);

  return (
    <div className={s.main_list_wrap}>
      <div className={s.main_list}>
        <div className={s.success_alert}>{success && <Success />}</div>
        {offers && offers.length ? (
          <ul>
            {offers.map((offer, i) => (
              <li key={i}>
                <MainOffersListLot
                  success={success}
                  addOfferToFavorites={addOfferToFavorites}
                  offer={offer}
                />
              </li>
            ))}
          </ul>
        ) : (
          <div className={`text-center py-5`}>
            {loading ? (
              <div className="spinner-border text-primary" role="status">
                <span className="sr-only">Loading...</span>
              </div>
            ) : (
              <div className="py-5 h5 text-center">
                Нет активных предложений...
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
