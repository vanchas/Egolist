import React, { useEffect } from "react";
import { connect } from "react-redux";
import AddOfferForm from '../components/add-offer/AddOfferForm'
import { getCities, getSubcategories, getCategories, showAlert } from '../redux/actions/actions'
import { createOffer } from '../redux/actions/userActions'

function AddOffer(props) {

  useEffect(() => {
    props.getCategories();
  }, []);

  return (
    <div>
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
        success={props.success} />
    </div>
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
