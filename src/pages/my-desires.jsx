import React, { useEffect, useState } from "react";
import MyDesiresList from "../components/my-desires/MyDesiresList";
import { connect } from "react-redux";
import {
  hideShowDesire,
  getMyDesires,
  sortMyDesires,
  deleteDesire,
} from "../redux/actions/userActions";
import { getCities, getSortingValues } from "../redux/actions/appActions";
import Router from "next/router";
import { authenticationService } from "../_services/authentication.service";
import s from '../components/my-desires/my-desire.module.scss'

function MyDesires({
  sortMyDesires,
  getMyDesires,
  hideShowDesire,
  desires,
  locations,
  cities,
  getCities,
  sortingValues,
  getSortingValues,
  deleteDesire,
}) {
  const [showPage, setShowPage] = useState(false);

  useEffect(() => {
    getMyDesires();
    getSortingValues();
    const user = authenticationService.currentUserValue;
    if (user && user.user) {
      setShowPage(true);
    } else Router.push("/login");
  }, []);

  return (
    <div className={s.my_desires_page}>
      {showPage && (
        <MyDesiresList
          deleteDesire={deleteDesire}
          sortingValues={sortingValues}
          desires={desires}
          hideShowDesire={hideShowDesire}
          locations={locations}
          cities={cities}
          getCities={getCities}
          sortMyDesires={sortMyDesires}
        />
      )}
    </div>
  );
}

const mapStateToProps = (state) => ({
  desires: state.user.myDesires,
  locations: state.app.locations,
  cities: state.app.cities,
  sortingValues: state.app.sortingValues,
});

const mapDispatchToProps = {
  hideShowDesire,
  getMyDesires,
  getCities,
  sortMyDesires,
  getSortingValues,
  deleteDesire,
};

export default connect(mapStateToProps, mapDispatchToProps)(MyDesires);
