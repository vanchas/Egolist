import React, { useEffect } from 'react'
import OffersList from '../components/my-offers/OffersList'
import { connect } from 'react-redux'
import { getMyOffers, getInterestingDesiresToOffer, hideShowOffer, sortMyOffers } from '../redux/actions/userActions'

function MyOffers({ getMyOffers, myOffers, getInterestingDesiresToOffer, interestingDesires, hideShowOffer, sortMyOffers }) {
  useEffect(() => {
    getMyOffers();
  }, []);

  return (
    <div>
      <OffersList
        interestingDesires={interestingDesires}
        getInterestingDesiresToOffer={getInterestingDesiresToOffer}
        myOffers={myOffers}
        hideShowOffer={hideShowOffer}
        sortMyOffers={sortMyOffers}
      />
    </div>
  )
}

const mapStateToProps = (state) => ({
  myOffers: state.user.myOffers,
  interestingDesires: state.user.interestingDesires
})

const mapDispatchToProps = {
  getMyOffers,
  getInterestingDesiresToOffer,
  hideShowOffer,
  sortMyOffers
}

export default connect(mapStateToProps, mapDispatchToProps)(MyOffers)
