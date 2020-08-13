import React, { useEffect, useState } from "react";
import s from "./offers-for-me.module.scss";
import OfferForMeItem from "./OfferForMeItem";
import HttpRequest from "../../_helpers/HttpRequest";
import MyOffersSortControl from "./MyOffersSortControl";

export default function OffersForMe({
  locations,
  desireId: desire_id,
  sortingValues,
}) {
  const [loading, setLoading] = useState(true);
  const [offersForCurrentDesire, setOffersForCurrentDesire] = useState(null);

  const loadData = async () => {
      await HttpRequest.execute(`/filter_offer`, "POST", "application/json", { desire_id })
          .then((data) => {
              setLoading(false);
              setOffersForCurrentDesire(data);
          })
          .catch((err) => {
              setLoading(false);
              console.error("Error: ", err);
          });
  }

  useEffect(() => {
    loadData();
    setTimeout(() => setLoading(false), 10000);
  }, []);

  const sortOffersByDesireId = async (id, sortId) => {
    await HttpRequest.execute(`/sort_offers/${id}/sort/${sortId}`)
      .then((data) => {
        setLoading(false);
        setOffersForCurrentDesire(data);
      })
      .catch((err) => {
        setLoading(false);
        console.error("Error: ", err);
      });
  };

  return (
    <div className={s.offers_list}>
      <MyOffersSortControl
        sortOffersByDesireId={sortOffersByDesireId}
        sortingValues={sortingValues}
      />

      <div className={s.blue_list_items}>
        {offersForCurrentDesire && offersForCurrentDesire.length ? (
          <ul>
            {offersForCurrentDesire.map((offer, i) => (
              <li key={i}>
                <OfferForMeItem offer={offer} locations={locations} />
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
                К данному желанию нет интересных предложений...
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
