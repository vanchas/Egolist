import React, { useState, useEffect } from "react";
import s from "./offers.module.scss";
import OfferCard from "./OfferCard";
import Router from "next/router";
import { SORT_MY_OFFERS } from "../../redux/actions/types";
import { connect, useDispatch } from "react-redux";
import MyOffersListSort from "./MyOffersListSort";

function MyOffersList({
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
    <div className={s.offers_list_wrap}>
      <div className={s.offers_list}>
        <MyOffersListSort
          sortingValues={sortingValues}
          sortOffersHandler={sortOffersHandler}
        />
        <div className={s.offers_list}>
          {myOffers && myOffers.length ? (
            <ul>
              {myOffers.map((offer, i) => {
                return (
                  <li key={i}>
                    <OfferCard
                      isActive={offer.is_active}
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
                <div className="spinner-border text-secondary" role="status">
                  <span className="sr-only">Loading...</span>
                </div>
              ) : (
                <div className="h5 py-5 text-center text-white">
                  У Вас нет активных предложений...
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => ({
  myOffers: state.user.myOffers,
});
export default connect(mapStateToProps, null)(MyOffersList);
