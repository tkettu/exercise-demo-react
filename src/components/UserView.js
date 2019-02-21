import React from 'react'
import { userConstants } from '../constants/user.constants';


//TODO: get userSports, add change to add new
const UserView = () => {
  const userName = window.localStorage.getItem(userConstants.USER_NAME)
  return <div>{userName}</div>
}

export default UserView