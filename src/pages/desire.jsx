import React, { useEffect, useState } from "react";
import s from "../components/desire/desire.module.scss";
import { connect } from "react-redux";
import {
  getDesireById,
  getOffersByDesireId,
  showSuccess,
} from "../redux/actions/actions";
import { addOfferToFavorites } from "../redux/actions/userActions";
import { useRouter } from "next/router";
import DesireCard from "../components/desire/DesireCard";
import UserCard from "../components/desire/UserCard";
import OffersList from "../components/desire/OffersList";
import Success from "../components/helpers/Success";

const Desire = ({
  getDesireById,
  desire,
  locations,
  getOffersByDesireId,
  offers,
  showSuccess,
  addOfferToFavorites,
  success,
}) => {
  const router = useRouter();
  const [showOffers, setShowOffers] = useState(false);

  useEffect(() => {
    getDesireById(router.query.id);
  }, []);

  const showOffersList = (id) => {
    if (!showOffers) {
      getOffersByDesireId(id);
    }
    setShowOffers(!showOffers);
  };

  return (
    <div className={s.desire_page}>
      {success && <Success />}
      <div className={s.desire_view}>
        <DesireCard desire={desire} showSuccess={showSuccess} />
        <UserCard user={desire.user} locations={locations} />
        {desire.header && (
          <div className={s.show_offers}>
            <span className="btn" onClick={() => showOffersList(desire.id)}>
              ПОКАЗАТЬ ПРЕДЛОЖЕНИЯ
            </span>
          </div>
        )}
      </div>
      {showOffers && (
        <OffersList
          addOfferToFavorites={addOfferToFavorites}
          offers={offers}
          locations={locations}
          showSuccess={showSuccess}
        />
      )}
    </div>
  );
};

const mapStateToProps = (state) => ({
  desire: state.app.desire,
  locations: state.app.locations,
  offers: state.app.offers,
  success: state.app.success,
});

const mapDispatchToProps = {
  getDesireById,
  getOffersByDesireId,
  showSuccess,
  addOfferToFavorites,
};

export default connect(mapStateToProps, mapDispatchToProps)(Desire);
