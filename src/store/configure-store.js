import rootReducer from '../reducers';
import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk'
import loggerMiddleware from 'redux-logger'

export default (initialState) => {
  return createStore(
    rootReducer, 
    initialState, 
    applyMiddleware(
      thunkMiddleware,
      loggerMiddleware
    )
  )
}