import React, { useEffect } from "react";
import UpdateOfferForm from '../components/update-offer/UpdateOfferForm'
import { connect } from "react-redux";
import { updateOffer, getOffer } from "../redux/actions/userActions";
import { getLocations, showAlert, getDesiresInfo, getCategories, getSubcategories, getCities, getOfferById } from '../redux/actions/actions'

const UpdateOffer = (props) => {
  useEffect(() => {
    props.getDesiresInfo();
    props.getCategories();
  }, []);

  return (
    <div>
      <UpdateOfferForm
          getOfferById={props.getOfferById}
          offer={props.offer}
        success={props.success}
        categories={props.categories}
        subcategories={props.subcategories}
        cities={props.cities}
        showAlert={props.showAlert}
        alert={props.alert}
        locations={props.locations}
        updateOffer={props.updateOffer}
        getSubcategories={props.getSubcategories}
        getCities={props.getCities}
        desiresInfo={props.desiresInfo} />
    </div>
  );
}

const mapStateToProps = (state) => ({
  offer: state.app.offer,
  locations: state.app.locations,
  alert: state.app.alert,
  cities: state.app.cities,
  categories: state.app.categories,
  subcategories: state.app.subcategories,
  success: state.app.success,
  desiresInfo: state.app.desiresInfo,
});

const mapDispatchToProps = {
  updateOffer,
  getOffer,
  getLocations,
  showAlert,
  getDesiresInfo,
  getCategories,
  getSubcategories,
  getCities,
  getOfferById
};

export default connect(mapStateToProps, mapDispatchToProps)(UpdateOffer);
