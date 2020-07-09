import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { getLocations, showAlert, getDesiresInfo, getCategories, getSubcategories, getCities } from '../../redux/actions/actions'
import { getMyDesires, updateDesire } from '../../redux/actions/userActions'
import UpdateForm from '../../components/update-desire/UpdateDesire'

function Id(props) {

  useEffect(() => {
    props.getMyDesires();
    props.getDesiresInfo();
    props.getCategories();
  }, []);

  return (
    <div>
      <UpdateForm
        success={props.success}
        types={props.types}
        priorities={props.priorities}
        categories={props.categories}
        subcategories={props.subcategories}
        cities={props.cities}
        showAlert={props.showAlert}
        alert={props.alert}
        locations={props.locations}
        updateDesire={props.updateDesire}
        myDesires={props.myDesires}
        getSubcategories={props.getSubcategories}
        getCities={props.getCities} />
    </div>
  )
}

const mapStateToProps = state => ({
  locations: state.app.locations,
  alert: state.app.alert,
  myDesires: state.user.myDesires,
  cities: state.app.cities,
  categories: state.app.categories,
  subcategories: state.app.subcategories,
  types: state.app.desiresInfo.types,
  priorities: state.app.desiresInfo.priorities,
  success: state.app.success
})

const mapDispatchToProps = {
  getLocations,
  showAlert,
  getMyDesires,
  updateDesire,
  getDesiresInfo,
  getCategories,
  getSubcategories,
  getCities,
}

export default connect(mapStateToProps, mapDispatchToProps)(Id);
