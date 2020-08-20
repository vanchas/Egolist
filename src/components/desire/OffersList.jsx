import React, { useEffect, useState } from "react";
import OffersItem from "./OffersItem";
import s from "./offers.module.scss";
import { connect } from "react-redux";
import { addOfferToComparison } from "../../redux/actions/userActions";
import Spinner from "../helpers/Spinner";

function OffersList({
  offers,
  locations,
  showSuccess,
  addOfferToFavorites,
  addOfferToComparison,
}) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (offers && offers.length) setLoading(false);
    const timer = setTimeout(() => setLoading(false), 5000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={s.offers_list_wrap}>
      <h4 className={s.heading}>ПОХОЖИЕ ПРЕДЛОЖЕНИЯ</h4>
      <ul className={s.offers_list}>
        {offers && offers.length ? (
          offers.map((offer, i) => (
            <OffersItem
              addOfferToComparison={addOfferToComparison}
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
              <Spinner color={`secondary`} />
            ) : (
              <div className="h5 text-center text-white py-5">
                К этому желанию еще нет предложений...
              </div>
            )}
          </div>
        )}
      </ul>
    </div>
  );
}
const mapStateToProps = (state) => ({});
const mapDispatchToProps = {
  addOfferToComparison,
};
export default connect(mapStateToProps, mapDispatchToProps)(OffersList);
