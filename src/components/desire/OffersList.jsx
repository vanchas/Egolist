import React, { useEffect, useState } from "react";
import OffersItem from "./OffersItem";
import s from "./offers.module.scss";

export default function OffersList({
  offers,
  locations,
  showSuccess,
  addOfferToFavorites,
}) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (offers && offers.length) setLoading(false);
    setTimeout(() => setLoading(false), 5000);
  }, []);

  return (
    <ul className={s.offers_list}>
      {offers && offers.length ? (
        offers.map((offer, i) => (
          <OffersItem
            addOfferToFavorites={addOfferToFavorites}
            showSuccess={showSuccess}
            offer={offer}
            key={i}
            locations={locations}
          />
        ))
      ) : (
        <div className={`text-center py-5`}>
          {loading ? (
            <div className="spinner-border text-primary" role="status">
              <span className="sr-only">Loading...</span>
            </div>
          ) : (
            <div className="h5 text-center py-5">
              К этому желанию еще нет предложений...
            </div>
          )}
        </div>
      )}
    </ul>
  );
}
