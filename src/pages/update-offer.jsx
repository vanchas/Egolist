import React, {useEffect, useState} from "react";
import UpdateOfferForm from '../components/update-offer/UpdateOfferForm'
import { connect } from "react-redux";
import { updateOffer, getOffer, deleteOfferPhoto } from "../redux/actions/userActions";
import { getLocations, showAlert, getCategories, getSubcategories, getCities, getCurrencies, getOfferById } from '../redux/actions/appActions'
import {authenticationService} from "../_services/authentication.service";
import Router from "next/router";
import s from '../components/update-offer/update-offer.module.scss'

const UpdateOffer = (props) => {
  const [showPage, setShowPage] = useState(false)

  useEffect(() => {
    props.getCurrencies()
    const user = authenticationService.currentUserValue;
    if (user && user.user) {
      setShowPage(true)
    } else Router.push('/login')
    props.getCategories();
  }, []);

  return (
    <div className={s.update_page}>
      {showPage &&
    <UpdateOfferForm
        deleteOfferPhoto={props.deleteOfferPhoto}
        getOfferById={props.getOfferById}
        offer={props.offer}
        categories={props.categories}
        subcategories={props.subcategories}
        cities={props.cities}
        showAlert={props.showAlert}
        locations={props.locations}
        updateOffer={props.updateOffer}
        getSubcategories={props.getSubcategories}
        getCities={props.getCities}
    />
    }</div>
  );
}

const mapStateToProps = (state) => ({
  offer: state.app.offer,
  locations: state.app.locations,
  cities: state.app.cities,
  categories: state.app.categories,
  subcategories: state.app.subcategories,
});

const mapDispatchToProps = {
  updateOffer,
  getOffer,
  getLocations,
  showAlert,
  getCategories,
  getSubcategories,
  getCities,
  getOfferById,
  deleteOfferPhoto,
  getCurrencies
};

export default connect(mapStateToProps, mapDispatchToProps)(UpdateOffer);
