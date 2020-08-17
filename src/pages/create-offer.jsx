import React, {useEffect, useState} from "react";
import { connect } from "react-redux";
import AddOfferForm from '../components/create-offer-lot/CreateOfferForm'
import { getCities, getSubcategories, getCategories, showAlert } from '../redux/actions/appActions'
import { createOffer } from '../redux/actions/userActions'
import {authenticationService} from "../_services/authentication.service";
import Router from "next/router";
import s from '../components/create-offer-lot/add-form.module.scss'

function CreateOffer(props) {
  const [showPage, setShowPage] = useState(false)

  useEffect(() => {
    const user = authenticationService.currentUserValue;
    if (user && user.user) {
      setShowPage(true)
    } else Router.push('/login')
    props.getCategories();
  }, []);

  return (
    <div className={s.add_lot_page}>
      {showPage &&
    <AddOfferForm
        createOffer={props.createOffer}
        showAlert={props.showAlert}
        categories={props.categories}
        subcategories={props.subcategories}
        getSubcategories={props.getSubcategories}
        locations={props.locations}
        cities={props.cities}
        getCities={props.getCities}
    />
    }</div>
  );
}

const mapStateToProps = (state) => ({
  locations: state.app.locations,
  cities: state.app.cities,
  categories: state.app.categories,
  subcategories: state.app.subcategories,
})

const mapDispatchToProps = {
  getCities,
  createOffer,
  getSubcategories,
  getCategories,
  showAlert
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateOffer)
