import React, {useEffect, useState} from "react";
import { connect } from "react-redux";
import AddOfferForm from '../components/add-offer/AddOfferForm'
import { getCities, getSubcategories, getCategories, showAlert } from '../redux/actions/appActions'
import { createOffer } from '../redux/actions/userActions'
import {authenticationService} from "../_services/authentication.service";
import Router from "next/router";

function AddOffer(props) {
  const [showPage, setShowPage] = useState(false)

  useEffect(() => {
    const user = authenticationService.currentUserValue;
    if (user && user.user) {
      setShowPage(true)
    } else Router.push('/login')
    props.getCategories();
  }, []);

  return (
    <div>{showPage &&
    <AddOfferForm
        createOffer={props.createOffer}
        alert={props.alert}
        showAlert={props.showAlert}
        categories={props.categories}
        subcategories={props.subcategories}
        getSubcategories={props.getSubcategories}
        locations={props.locations}
        cities={props.cities}
        getCities={props.getCities}
        success={props.success}/>
    }</div>
  );
}

const mapStateToProps = (state) => ({
  locations: state.app.locations,
  cities: state.app.cities,
  categories: state.app.categories,
  subcategories: state.app.subcategories,
  alert: state.app.alert,
  success: state.app.success,
})

const mapDispatchToProps = {
  getCities,
  createOffer,
  getSubcategories,
  getCategories,
  showAlert
}

export default connect(mapStateToProps, mapDispatchToProps)(AddOffer)
