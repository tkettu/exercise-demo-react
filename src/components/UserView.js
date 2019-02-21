import React from 'react'
import { userConstants } from '../constants/user.constants'
import { userSportList } from '../reducers/userReducer'
import userService from '../services/users'


//TODO: get userSports, add change to add new

const UserView = () => {
  const userName = window.localStorage.getItem(userConstants.USER_NAME)
  userService.getSportList(userName)
  
  return <div>{userName}</div>
}

export default UserView