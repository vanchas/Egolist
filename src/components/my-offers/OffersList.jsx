import React, { useState, useEffect } from "react";
import s from "./offers.module.scss";
import OfferCard from "./OfferCard";
import Router from "next/router";
import { SORT_MY_OFFERS } from "../../redux/actions/types";
import { useDispatch } from "react-redux";

export default function DesireRedList({
  myOffers,
  hideShowOffer,
  sortMyOffers,
  sortingValues,
  deleteOffer,
}) {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    if (myOffers && myOffers.length) {
      setLoading(false);
    }
    setTimeout(() => setLoading(false), 10000);
  }, [myOffers]);

  const sortOffersHandler = (value) => {
    setLoading(true);
    dispatch({ type: SORT_MY_OFFERS, payload: [] });
    sortMyOffers(value);
  };

  return (
    <div className={s.offers_list}>
      <div className={s.offers_list_heading}>Ваши предложения:</div>
      <div className={s.offers_list_sort}>
        <span className={s.btn_back} onClick={() => Router.back()}>
          Назад
        </span>
        {sortingValues ? (
          <select
            className="form-control"
            onChange={(e) => sortOffersHandler(e.target.value)}
          >
            <option value="default" hidden>
              Сортировка
            </option>
            {sortingValues && sortingValues.length
              ? sortingValues.map((val, i) => {
                  if (val.search_by.includes("idc")) {
                    return (
                      <option key={i} value={val.id}>
                        {val.value}
                      </option>
                    );
                  }
                  if (val.search_by.includes("price")) {
                    return (
                      <option key={i} value={val.id}>
                        {val.value}
                      </option>
                    );
                  }
                  if (val.search_by.includes("rating")) {
                    return (
                      <option key={i} value={val.id}>
                        {val.value}
                      </option>
                    );
                  }
                })
              : null}
          </select>
        ) : (
          <div className="spinner-border text-primary" role="status">
            <span className="sr-only">Loading...</span>
          </div>
        )}
      </div>

      <div className={s.offers_list_items}>
        {myOffers && myOffers.length ? (
          <ul>
            {myOffers.map((offer, i) => {
              return (
                <li key={i}>
                  <OfferCard
                    deleteOffer={deleteOffer}
                    hideShowOffer={hideShowOffer}
                    offer={offer}
                  />
                </li>
              );
            })}
          </ul>
        ) : (
          <div className={`text-center py-5`}>
            {loading ? (
              <div className="spinner-border text-primary" role="status">
                <span className="sr-only">Loading...</span>
              </div>
            ) : (
              <div className="h5 py-5 text-center">
                У Вас нет активных предложений...
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
