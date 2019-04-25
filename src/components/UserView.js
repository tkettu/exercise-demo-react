import React from 'react'
import { connect } from 'react-redux'
import { userConstants } from '../constants/user.constants'
import { userSportList } from '../reducers/userReducer'
import userService from '../services/users'
import _ from 'lodash'
import store from '../store'


//TODO: get userSports, add change to add new
let lista = []

const SportList = () => {
  //lista = userSportList()
  //console.log(lista)
 // props.userSportList()
  //return props.sports.map((i) => <li>i</li>)
  return <li>R</li>
}

const UserView = (props) => {
  const userName = window.localStorage.getItem(userConstants.USER_NAME)
  //lista = await userService.getSportList(userName)
  //TODO: lista reduxista
  //lista = userSportList()
  //console.log(lista)
  console.log(props)
  //props.userSportList()
  //console.log(props)
  
  //const items = lista.map((i) => <li>{i}</li>)
  
  //return <ul>{items}</ul>
  return <ul>{<SportList />}</ul>
}

const mapStateToProps = (state) => {
  //console.log(store.getState().userReducer.sports)
  
  return {
    sports: store.getState().userReducer.sports
  }
}


export default connect(
  mapStateToProps,
  { userSportList }
)(UserView)