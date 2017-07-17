import {combineReducers} from 'redux'
import * as types from '../constants/ActionTypes' 

const visibleIndex = (state = 0, action) => {
  switch(action.type) {
    case types.SWIPE:
      return state + 1
    default:
      return state
  }
}

const location = (state = {}, action) => {
  switch(action.type) {
    case types.UPDATE_LOCATION:
      return action.location      
    default:
      return state
  }
}

const food = (state = {}, action) => {
  switch(action.type) {
    case types.DISLIKE:
      if (state.id !== action.id) return state
      return Object.assign({}, state, {
        liked: 'GROSS'
      })
    case types.LIKE:
      if (state.id !== action.id) return state
      return Object.assign({}, state, {
        liked: 'DELISH'
      })
    default:
      return state
  }
}

const foodList = (state = {
    isFetching: false,
    didInvalidate: false,
    items: []
  }, action) => {
  switch(action.type) {
    case types.DISLIKE:
    case types.LIKE:
      return Object.assign({}, state, {
        items: state.items.map(f => food(f, action))
      })
    case types.FETCH_FOOD_REQUEST:
      return Object.assign({}, state, {
        isFetching: true,
        didInvalidate: false
      })
    case types.FETCH_FOOD_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        didInvalidate: false,
        items: action.foodList,
        lastUpdated: action.receivedAt
      })
    default:
      return state
  }
}

const rootReducer = combineReducers({
  foodList,
  location,
  visibleIndex
})

export default rootReducer
