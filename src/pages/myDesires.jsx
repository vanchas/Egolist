import React, {useEffect, useState} from 'react'
import MyDesiresList from '../components/my-desires/MyDesiresList'
import { connect } from 'react-redux'
import { hideShowDesire, getMyDesires, sortMyDesires } from '../redux/actions/userActions'
import { getCities } from '../redux/actions/actions'
import Router from "next/router";
import {authenticationService} from "../_services/authentication.service";

function MyDesires({ sortMyDesires, getMyDesires, hideShowDesire, desires, locations, cities, getCities }) {
  const [showPage, setShowPage] = useState(false)

  useEffect(() => {
    const user = authenticationService.currentUserValue;
    if (user && user.user) {
      setShowPage(true)
    } else Router.push('/login')
    getMyDesires();
  }, []);

  return (
    <div>{showPage &&
    <MyDesiresList
        desires={desires}
        hideShowDesire={hideShowDesire}
        locations={locations}
        cities={cities}
        getCities={getCities}
        sortMyDesires={sortMyDesires}
    />
    }</div>
  )
}

const mapStateToProps = (state) => ({
  desires: state.user.myDesires,
  locations: state.app.locations,
  cities: state.app.cities,
})

const mapDispatchToProps = {
  hideShowDesire,
  getMyDesires,
  getCities,
  sortMyDesires
}

export default connect(mapStateToProps, mapDispatchToProps)(MyDesires)
