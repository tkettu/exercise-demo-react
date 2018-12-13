import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'

import loginReducer from './reducers/loginReducer'
import messageReducer from './reducers/messageReducer'

const reducer = combineReducers({
  loginReducer,
  messageReducer
})

const store = createStore(
  reducer,
  //window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
  applyMiddleware(thunk)
)

export default store