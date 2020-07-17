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
} from "../../redux/actions/actions";

function Header({
  getLocations,
  locations,
  searchInfo,
  filterOffers,
  filterDesires,
  selectedCategory,
  getCities,
  cities,
  selectedSubcategory,
}) {
  useEffect(() => {
    getLocations();
  }, []);

  return (
    <header className={`header ${s.header}`}>
      <NavComponent
        getCities={getCities}
        cities={cities}
        locations={locations}
        searchInfo={searchInfo}
        filterOffers={filterOffers}
        filterDesires={filterDesires}
        selectedCategory={selectedCategory}
        selectedSubcategory={selectedSubcategory}
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
