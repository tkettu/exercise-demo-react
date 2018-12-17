import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'

import loginReducer from './reducers/loginReducer'
import messageReducer from './reducers/messageReducer'
import exerciseReducer from './reducers/exerciseReducer'

const reducer = combineReducers({
  loginReducer,
  messageReducer,
  exerciseReducer
})

const store = createStore(
  reducer,
  //window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
  applyMiddleware(thunk)
)

export default store