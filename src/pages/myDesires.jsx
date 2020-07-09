import React, { useEffect } from 'react'
import MyDesiresList from '../components/my-desires/MyDesiresList'
import { connect } from 'react-redux'
import { hideShowDesire, getMyDesires, sortOffersByDesireId, sortMyDesires } from '../redux/actions/userActions'
import { getCities, getOffersByDesireId } from '../redux/actions/actions'

function MyDesires({ sortMyDesires, getMyDesires, hideShowDesire, desires, locations, cities, getCities, getOffersByDesireId, offers, sortOffersByDesireId }) {
  useEffect(() => {
    getMyDesires();
  }, []);

  return (
    <div>
      <MyDesiresList
        desires={desires}
        hideShowDesire={hideShowDesire}
        locations={locations}
        cities={cities}
        getCities={getCities}
        offers={offers}
        getOffersByDesireId={getOffersByDesireId}
        sortOffersByDesireId={sortOffersByDesireId}
        sortMyDesires={sortMyDesires}
      />
    </div>
  )
}

const mapStateToProps = (state) => ({
  desires: state.user.myDesires,
  locations: state.app.locations,
  cities: state.app.cities,
  offers: state.app.offers
})

const mapDispatchToProps = {
  hideShowDesire,
  getMyDesires,
  getCities,
  getOffersByDesireId,
  sortOffersByDesireId,
  sortMyDesires
}

export default connect(mapStateToProps, mapDispatchToProps)(MyDesires)
