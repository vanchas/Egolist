import React, {useEffect, useState} from "react";
import AddLotForm from "../../components/add-desire-lot/AddLotForm";
import s from "../../components/add-desire-lot/add-form.module.scss";
import { connect } from "react-redux";
import {
  createDesire,
  getCurrentGeoPosition,
} from "../../redux/actions/userActions";
import {
  showAlert,
  getDesiresInfo,
  getCategories,
  getSubcategories,
  getCities,
} from "../../redux/actions/actions";
import Success from "../../components/helpers/Success";
import {authenticationService} from "../../_services/authentication.service";
import Router from "next/router";

function Index({
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
  const [showPage, setShowPage] = useState(false)

  useEffect(() => {
    const user = authenticationService.currentUserValue;
    if (user && user.user) {
      setShowPage(true)
    } else Router.push('/login')
    getCurrentGeoPosition();
    getDesiresInfo();
    getCategories();
  }, []);

  return (
    <div className={s.add_lot_page}>
      {success && <Success />}
      {showPage &&
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
        />}
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

export default connect(mapStateToProps, mapDispatchToProps)(Index);
