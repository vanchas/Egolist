import React, { useEffect } from "react";
import AddLotForm from "../components/add-desire-lot/AddLotForm";
import s from "../components/add-desire-lot/add-form.module.scss";
import { connect } from "react-redux";
import {
  createDesire,
  getCurrentGeoPosition,
} from "../redux/actions/userActions";
import {
  showAlert,
  getDesiresInfo,
  getCategories,
  getSubcategories,
  getCities,
} from "../redux/actions/actions";
import Success from "../components/helpers/Success";

function AddNewLot({
  alert,
  showAlert,
  createDesire,
  getDesiresInfo,
  getCategories,
  desiresInfo,
  categories,
  getSubcategories,
  subcategories,
  locations,
  cities,
  getCities,
  success,
  getCurrentGeoPosition,
  currentGeoPosition,
}) {
  useEffect(() => {
    getCurrentGeoPosition();
    getDesiresInfo();
    getCategories();
  }, []);

  return (
    <div className={s.add_lot_page}>
      {success && <Success />}
      <h3>Making New Lot</h3>
      <AddLotForm
        success={success}
        alert={alert}
        desiresInfo={desiresInfo}
        categories={categories}
        showAlert={showAlert}
        createDesire={createDesire}
        subcategories={subcategories}
        getSubcategories={getSubcategories}
        locations={locations}
        cities={cities}
        getCities={getCities}
        currentGeoPosition={currentGeoPosition}
      />
    </div>
  );
}

const mapStateToProps = (state) => ({
  alert: state.app.alert,
  desiresInfo: state.app.desiresInfo,
  categories: state.app.categories,
  subcategories: state.app.subcategories,
  locations: state.app.locations,
  cities: state.app.cities,
  success: state.app.success,
  currentGeoPosition: state.user.currentGeoPosition,
});

const mapDispatchToProps = {
  createDesire,
  showAlert,
  getDesiresInfo,
  getCategories,
  getSubcategories,
  getCities,
  getCurrentGeoPosition,
};

export default connect(mapStateToProps, mapDispatchToProps)(AddNewLot);
