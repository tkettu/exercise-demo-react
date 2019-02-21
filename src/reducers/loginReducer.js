import loginService from '../services/login'
import { userConstants } from '../constants/user.constants'
import { history } from '../_helpers/history'
import { errorMsg, successMsg, clearMsg } from './messageReducer'

const timeout = 5000

const reducer = (state = {}, action) => {
  switch (action.type) {
    case userConstants.LOGIN_REQUEST:
      return {  
        loggingIn: true,
        username: action.data
      }      
    case userConstants.LOGIN_SUCCESS:
      window.localStorage.setItem(
        userConstants.LOCAL_STORAGE,
        JSON.stringify(action.data))
        
      return {
              loggingIn: false,
              loggedIn: true,
              user: action.data
              }
    case userConstants.LOGIN_FAILURE:
      return {loggingIn: false}
    case userConstants.LOGOUT:
      window.localStorage.clear()
      return {
              loggingIn: false,
              loggedIn: false
            }
    default:
      return state
  }
}

const request = (username) => ({ type: userConstants.LOGIN_REQUEST, data: username })
const success = (user) => ({ type: userConstants.LOGIN_SUCCESS, data: user })
const failure = (error) => ({ type: userConstants.LOGIN_FAILURE, error })

const logout_success = () => ({ type: userConstants.LOGOUT })

const parseJwt = (token) => {
  try {
    return JSON.parse(atob(token.split('.')[1]));
  } catch (e) {
    return null;
  }
};

export const login = ({username, password}) => {
 
  const credentials = {username, password}
  return dispatch => {

    dispatch(request(username))
    loginService.login(
      credentials
    )
      .then(
        user => {
          dispatch(success(user))
          history.push('/')
          
          localStorage.setItem(userConstants.USER_NAME, user.userName)
          localStorage.setItem(userConstants.USER_TOKEN, user.accessToken)

          dispatch(successMsg(`Tervetuloa ${user.userName}`))
          //dispatch(exerciseInitialization())
          setTimeout(() => {
            dispatch(clearMsg())
          }, timeout)
        },
        error => {
          dispatch(failure(error))
          dispatch(errorMsg(JSON.stringify(error.response.data.message)))
          setTimeout(() => {
            dispatch(clearMsg())
          }, timeout)
        }
      )  
  }
}

export const logout = () => {

  return dispatch => {
    dispatch(logout_success())
  }
}

export default reducer