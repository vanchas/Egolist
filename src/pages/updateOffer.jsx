import React, { useEffect } from "react";
import UpdateOfferForm from '../components/update-offer/UpdateOfferForm'
import { connect } from "react-redux";
import { updateOffer, getOffer } from "../redux/actions/userActions";
import { getLocations, showAlert, getDesiresInfo, getCategories, getSubcategories, getCities } from '../redux/actions/actions'

const UpdateOffer = (props) => {
  useEffect(() => {
    props.getDesiresInfo();
    props.getCategories();
  }, []);

  return (
    <div>
      <UpdateOfferForm
        success={props.success}
        types={props.types}
        priorities={props.priorities}
        categories={props.categories}
        subcategories={props.subcategories}
        cities={props.cities}
        showAlert={props.showAlert}
        alert={props.alert}
        locations={props.locations}
        updateOffer={props.updateOffer}
        getSubcategories={props.getSubcategories}
        getCities={props.getCities} />
    </div>
  );
}

const mapStateToProps = (state) => ({
  offer: state.user.offer,
  locations: state.app.locations,
  alert: state.app.alert,
  cities: state.app.cities,
  categories: state.app.categories,
  subcategories: state.app.subcategories,
  types: state.app.desiresInfo.types,
  priorities: state.app.desiresInfo.priorities,
  success: state.app.success
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
};

export default connect(mapStateToProps, mapDispatchToProps)(UpdateOffer);
