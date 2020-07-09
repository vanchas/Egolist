import React from 'react'
import { connect } from 'react-redux'

const Alert = ({ alert }) => (
  <div className="alert alert-danger mt-2" role="alert">{alert}</div>
)

const mapStateToProps = state => ({
  alert: state.app.alert
})

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(Alert);
