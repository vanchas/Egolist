import React, { useEffect, useState } from "react";
import s from "../components/desire/desire.module.scss";
import { connect, useDispatch } from "react-redux";
import {
  getDesireById,
  getOffersByDesireId,
  showSuccess,
} from "../redux/actions/appActions";
import { addOfferToFavorites } from "../redux/actions/userActions";
import Router from "next/router";
import DesireCard from "../components/desire/DesireCard";
import UserCard from "../components/desire/UserCard";
import OffersList from "../components/desire/OffersList";
import {
  GET_DESIRE_BY_ID,
  GET_OFFERS_BY_DESIRE_ID,
} from "../redux/actions/types";

const Desire = ({
  getDesireById,
  desire = null,
  locations,
  getOffersByDesireId,
  offers,
  showSuccess,
  addOfferToFavorites,
}) => {
  const dispatch = useDispatch();
  const [showOffers, setShowOffers] = useState(true);

  const fetchData = () => {
    getDesireById(Router.query.id);
    showOffersList(Router.query.id);
  }

  useEffect(() => {
    // dispatch({ type: GET_DESIRE_BY_ID, payload: {} });
    let timer
    if (Router.query.id) {
      fetchData()
    } else {
      timer = setTimeout(() => fetchData(), 1000)
    }
    return () => {
      clearTimeout(timer)
      dispatch({ type: GET_OFFERS_BY_DESIRE_ID, payload: [] });
      dispatch({ type: GET_DESIRE_BY_ID, payload: {} });
    };
  }, []);

  const showOffersList = (id) => {
    dispatch({ type: GET_OFFERS_BY_DESIRE_ID, payload: [] });
    if (!showOffers) {
      getOffersByDesireId(id);
    }
    setShowOffers(!showOffers);
  };

  return (
    <div className={s.desire_page}>
      <div className={s.desire_view}>
        <DesireCard desire={desire} />
        <UserCard user={desire && desire.user ? desire.user : null} locations={locations} />
        {desire.header && (
          <div className={s.show_offers}>
            <span className="btn text-light btn-outline-secondary" onClick={() => showOffersList(desire.id)}>
              ПОКАЗАТЬ ПРЕДЛОЖЕНИЯ
            </span>
          </div>
        )}
      </div>
      {showOffers && desire ? (
        <OffersList
          addOfferToFavorites={addOfferToFavorites}
          offers={offers}
          locations={locations}
          showSuccess={showSuccess}
        />
      ) : null}
    </div>
  );
};

const mapStateToProps = (state) => ({
  desire: state.app.desire,
  locations: state.app.locations,
  offers: state.app.offers,
});

const mapDispatchToProps = {
  getDesireById,
  getOffersByDesireId,
  showSuccess,
  addOfferToFavorites,
};

export default connect(mapStateToProps, mapDispatchToProps)(Desire);
