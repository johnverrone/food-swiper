import React, { Component } from 'react'
import { Provider } from 'react-redux'
import configureStore from './store/configure-store'

import FoodContainer from './containers/FoodContainer'

let initialState = {
  visibleIndex: 0,
  foodList: {
    isFetching: false,
    items: [{
      id: 0,
      name: 'Bananas',
      image_url: 'https://upload.wikimedia.org/wikipedia/commons/d/de/Bananavarieties.jpg',
      rating: 4
    }, {
      id: 1,
      name: 'Apples',
      image_url: 'https://upload.wikimedia.org/wikipedia/commons/1/15/Red_Apple.jpg',
      rating: 4.5
    }]
  }
}

const store = configureStore(initialState)

class Root extends Component {
  render () {
    return (
      <Provider store={store}>
        <FoodContainer />
      </Provider>
    )
  }
}

export default Root