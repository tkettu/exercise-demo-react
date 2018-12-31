import userService from '../services/users'
import { userConstants } from '../constants/user.constants'
import { history } from '../_helpers/history'
import { errorMsg, successMsg, clearMsg } from './messageReducer'

const timeout = 5000

const reducer = (state = {}, action) => {
  switch (action.type) {
    case userConstants.REGISTER_REQUEST:
      return {
        signingUp: true,
        user: action.data
      }
    case userConstants.REGISTER_SUCCESS:
      //Log in automatically, or demand manual login
      return {
        signingUp: false,
        user: action.data
      }
    case userConstants.REGISTER_FAILURE:
      return {
        signingUp: false
      }
    default:
      return state
  }
}

const request = (user) => ({ type: userConstants.REGISTER_REQUEST, data: user })
const success = (user) => ({ type: userConstants.REGISTER_SUCCESS, data: user })
const failure = (error) => ({ type: userConstants.REGISTER_FAILURE, error })

export const register = (user) => {
  console.log(user)
  
  return dispatch => {
    dispatch(request(user))

    userService.register(user)
      .then(
        user => {
          dispatch(success(user))
          history.push('/login')
          console.log(user)
          
          dispatch(successMsg(`${user.message}`))
          setTimeout(() => {
            dispatch(clearMsg())
          }, timeout)
          //alertactions Registration succesfull
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

export default reducer
