import React from 'react'

import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { logout } from '../reducers/loginReducer'

 
const Logout = (props) => {
  console.log('LOGGING OUT')
  
  props.logout()
  return (
    <Redirect to='/' />
  )
  //return null
}



export default connect(
  null,
  { logout }
)(Logout)