import React, {useEffect, useState} from 'react'
import OffersList from '../components/my-offers/OffersList'
import { connect } from 'react-redux'
import { getMyOffers, hideShowOffer, sortMyOffers } from '../redux/actions/userActions'
import {authenticationService} from "../_services/authentication.service";
import Router from "next/router";

function MyOffers({ getMyOffers, myOffers, hideShowOffer, sortMyOffers }) {
  const [showPage, setShowPage] = useState(false)

  useEffect(() => {
    const user = authenticationService.currentUserValue;
    if (user && user.user) {
      setShowPage(true)
    } else Router.push('/login')
    getMyOffers();
  }, []);

  return (
    <div>{showPage &&
    <OffersList
        myOffers={myOffers}
        hideShowOffer={hideShowOffer}
        sortMyOffers={sortMyOffers}
    />
    }</div>
  )
}

const mapStateToProps = (state) => ({
  myOffers: state.user.myOffers,
})

const mapDispatchToProps = {
  getMyOffers,
  hideShowOffer,
  sortMyOffers
}

export default connect(mapStateToProps, mapDispatchToProps)(MyOffers)
