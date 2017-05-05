import * as types from '../constants/ActionTypes'
import fetch from 'isomorphic-fetch'
import * as config from '../config/config'

export const dislike = (id) => {
  return {
    type: types.DISLIKE,
    id
  }
}

export const like = (id) => {
  return {
    type: types.LIKE,
    id
  }
}

export const swipe = (id) => {
  return {
    type: types.SWIPE,
    id
  }
}

const fetchFoodRequest = (coordinates) => {
  return { 
    type: types.FETCH_FOOD_REQUEST,
    coordinates
  }
}

const fetchFoodFailure = (error) => {
  return { 
    type: types.FETCH_FOOD_FAILURE, 
    error 
  }
}

const fetchFoodSuccess = (json) => {
  return { 
    type: types.FETCH_FOOD_SUCCESS, 
    foodList: json.businesses,
    receivedAt: Date.now()
  }
}

export const fetchFood = (coordinates) => {
  return (dispatch) => {
    dispatch(fetchFoodRequest(coordinates))

    let data = new FormData()
    data.append('grant_type', 'client_credentials')
    data.append('client_id', config.CLIENT_ID)
    data.append('client_secret', config.CLIENT_SECRET)
    
    fetch(config.YELP_ACCESS_TOKEN_URL, 
      {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        method: 'POST',
        body: data
      }
    )
    .then(response => response.json())
    .then(data => {
        return fetch(`https://api.yelp.com/v3/businesses/search?term=food&latitude=${coordinates.lat}&longitude=${coordinates.lon}`, 
          {
            headers: {
              'Authorization': `BEARER ${data.access_token}`
            }
          })
          .then(response => response.json())
          .then(json => dispatch(fetchFoodSuccess(json)))
          .catch(error => dispatch(fetchFoodFailure(error)))
      })
    }
}