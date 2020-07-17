import React, { useEffect } from "react";
import s from "./header.module.scss";
import NavComponent from "./Nav";
import { connect } from "react-redux";
import {
  getLocations,
  searchInfo,
  filterOffers,
  filterDesires,
} from "../../redux/actions/actions";

function Header({
  getLocations,
  locations,
  searchInfo,
  filterOffers,
  filterDesires,
  selectedCategory,
}) {
  useEffect(() => {
    getLocations();
  }, []);

  return (
    <header className={`header ${s.header}`}>
      <NavComponent
        locations={locations}
        searchInfo={searchInfo}
        filterOffers={filterOffers}
        filterDesires={filterDesires}
        selectedCategory={selectedCategory}
      />
    </header>
  );
}

const mapStateToProps = (state) => {
  return  {
    locations: state.app.locations,
    selectedCategory: state.app.selectedCategory,
  }
};

const mapDispatchToProps = {
  getLocations,
  searchInfo,
  filterOffers,
  filterDesires,
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
