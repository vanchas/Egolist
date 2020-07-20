import React, { useEffect, useState } from "react";
import OffersList from "../components/my-offers/OffersList";
import { connect } from "react-redux";
import { getSortingValues } from "../redux/actions/actions";
import {
  getMyOffers,
  hideShowOffer,
  sortMyOffers,
} from "../redux/actions/userActions";
import { authenticationService } from "../_services/authentication.service";
import Router from "next/router";
import Success from "../components/helpers/Success";
import Alert from "../components/helpers/Alert";

function MyOffers({
  getMyOffers,
  myOffers,
  hideShowOffer,
  sortMyOffers,
  getSortingValues,
  sortingValues,
    success,
    alert
}) {
  const [showPage, setShowPage] = useState(false);

  useEffect(() => {
    const user = authenticationService.currentUserValue;
    if (user && user.user) {
      setShowPage(true);
    } else Router.push("/login");
    getMyOffers();
    getSortingValues();
  }, []);

  return (
    <div>
      {success && <Success />}
      {alert && <Alert />}
      {showPage && (
        <OffersList
          sortingValues={sortingValues}
          myOffers={myOffers}
          hideShowOffer={hideShowOffer}
          sortMyOffers={sortMyOffers}
        />
      )}
    </div>
  );
}

const mapStateToProps = (state) => ({
  myOffers: state.user.myOffers,
  sortingValues: state.app.sortingValues,
  success: state.app.success,
  alert: state.app.alert
});

const mapDispatchToProps = {
  getMyOffers,
  hideShowOffer,
  sortMyOffers,
  getSortingValues,
};

export default connect(mapStateToProps, mapDispatchToProps)(MyOffers);
