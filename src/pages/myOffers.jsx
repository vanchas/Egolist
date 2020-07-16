import React, { useEffect } from 'react'
import OffersList from '../components/my-offers/OffersList'
import { connect } from 'react-redux'
import { getMyOffers, hideShowOffer, sortMyOffers } from '../redux/actions/userActions'

function MyOffers({ getMyOffers, myOffers, hideShowOffer, sortMyOffers }) {
  useEffect(() => {
    getMyOffers();
  }, []);

  return (
    <div>
      <OffersList
        myOffers={myOffers}
        hideShowOffer={hideShowOffer}
        sortMyOffers={sortMyOffers}
      />
    </div>
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
