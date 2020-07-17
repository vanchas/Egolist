import React, { useEffect } from "react";
import UpdateOfferForm from '../components/update-offer/UpdateOfferForm'
import { connect } from "react-redux";
import { updateOffer, getOffer, deleteOfferPhoto } from "../redux/actions/userActions";
import { getLocations, showAlert, getCategories, getSubcategories, getCities, getOfferById } from '../redux/actions/actions'

const UpdateOffer = (props) => {
  useEffect(() => {
    props.getCategories();
  }, []);

  return (
    <div>
      <UpdateOfferForm
          deleteOfferPhoto={props.deleteOfferPhoto}
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
        getCities={props.getCities} />
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
  deleteOfferPhoto
};

export default connect(mapStateToProps, mapDispatchToProps)(UpdateOffer);
