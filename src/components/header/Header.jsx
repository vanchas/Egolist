import React, { useEffect } from "react";
import s from "./header.module.scss";
import NavComponent from "./Nav";
import { connect } from "react-redux";
import {
  getLocations,
  searchInfo,
  filterOffers,
  filterDesires,
  getCities,
} from "../../redux/actions/appActions";

function Header(props) {
  useEffect(() => {
    props.getLocations();
  }, []);

  return (
    <header className={`header ${s.header}`}>
      <NavComponent
        getCities={props.getCities}
        cities={props.cities}
        locations={props.locations}
        searchInfo={props.searchInfo}
        filterOffers={props.filterOffers}
        filterDesires={props.filterDesires}
        selectedCategory={props.selectedCategory}
        selectedSubcategory={props.selectedSubcategory}
        comparisonOffers={props.comparisonOffers}
      />
    </header>
  );
}

const mapStateToProps = (state) => {
  return {
    locations: state.app.locations,
    selectedCategory: state.app.selectedCategory,
    selectedSubcategory: state.app.selectedSubcategory,
    cities: state.app.cities,
    comparisonOffers: state.user.comparisonOffers,
  };
};

const mapDispatchToProps = {
  getLocations,
  searchInfo,
  filterOffers,
  filterDesires,
  getCities,
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
