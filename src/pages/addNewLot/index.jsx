import React, {useEffect, useState} from "react";
import CreateDesireForm from "../../components/create-desire-lot/CreateDesireForm";
import s from "../../components/create-desire-lot/add-form.module.scss";
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
} from "../../redux/actions/appActions";
import {authenticationService} from "../../_services/authentication.service";
import Router from "next/router";

function Index(props) {
  const [showPage, setShowPage] = useState(false)

  useEffect(() => {
    const user = authenticationService.currentUserValue;
    if (user && user.user) {
      setShowPage(true)
    } else Router.push('/login')
    props.getCurrentGeoPosition();
    props.getDesiresInfo();
    props.getCategories();
  }, []);

  return (
    <div className={s.add_lot_page}>
      {showPage &&
        <CreateDesireForm
          desiresInfo={props.desiresInfo}
          categories={props.categories}
          showAlert={props.showAlert}
          createDesire={props.createDesire}
          subcategories={props.subcategories}
          getSubcategories={props.getSubcategories}
          locations={props.locations}
          cities={props.cities}
          getCities={props.getCities}
          currentGeoPosition={props.currentGeoPosition}
        />}
    </div>
  );
}

const mapStateToProps = (state) => ({
  desiresInfo: state.app.desiresInfo,
  categories: state.app.categories,
  subcategories: state.app.subcategories,
  locations: state.app.locations,
  cities: state.app.cities,
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
