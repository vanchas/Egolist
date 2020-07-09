import React, { useEffect } from 'react'
import s from './header.module.scss';
import NavComponent from './Nav';
import { connect } from 'react-redux';
import { getLocations, searchInfo, filterOffers, filterDesires } from '../../redux/actions/actions';

function Header({ getLocations, locations, searchInfo, filterOffers, filterDesires }) {
  useEffect(() => {
    getLocations();
  }, []);

  return (
    <header className={`header ${s.header}`}>
      <NavComponent locations={locations}
        searchInfo={searchInfo}
        filterOffers={filterOffers}
        filterDesires={filterDesires} />
    </header>
  )
}

const mapStateToProps = state => ({
  locations: state.app.locations
})

const mapDispatchToProps = {
  getLocations,
  searchInfo,
  filterOffers,
  filterDesires
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);
