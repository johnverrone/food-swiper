import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { dislike, like, swipe, fetchFood } from '../actions'
import {
  ActivityIndicator,
  Alert,
  Button,
  Image,
  StyleSheet,
  Text,
  TouchableHighlight,
  View
} from 'react-native'
import FoodItem from '../components/FoodItem'

const mapStateToProps = (state) => {
  return {
    food: state.foodList.items[state.visibleIndex],
    isFetching: state.foodList.isFetching,
    visibleIndex: state.visibleIndex
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    dislike: (id) => {
      dispatch(dislike(id))
    },
    like: (id) => {
      dispatch(like(id))
      dispatch(swipe(id))
    },
    swipe: (id) => {
      dispatch(fetchFood({lat: 33.917904, lon: -84.495453}))
    }
  }
}

class FoodContainer extends Component {
  constructor(props) {
    super(props)
    navigator.geolocation.getCurrentPosition(
      (position) => {
        let initialPosition = JSON.stringify(position)
        console.log(initialPosition)
        // this.props.dispatch(updateLocation(initialPosition))
      },
      (error) => alert(JSON.stringify(error)),
      {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000}
    )
  }

  render() {
    return (
      <View style={styles.container}>
        <ActivityIndicator
          animating={this.props.isFetching}
        />
        <FoodItem style={styles.food} food={this.props.food} onLike={() => this.props.like()}/>
        <Button
          onPress={() => this.props.swipe(this.props.visibleIndex)}
          title="Load Data from Yelp"
          color="#841584"
          accessibilityLabel="loadData"
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20
  },
  food: {
    flex: 1
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(FoodContainer)
