import React, { Component } from 'react';
import {
  Animated,
  Image,
  PanResponder,
  StyleSheet,
  Text,
  View
} from 'react-native';

const SWIPE_THRESHOLD = 120;

class FoodItem extends Component {
  constructor(props) {
    super(props)

    this.state = {
      pan: new Animated.ValueXY()
    }

    this._panResponder = PanResponder.create({
      // Ask to be the responder:
      onStartShouldSetPanResponder: (evt, gestureState) => true,
      onStartShouldSetPanResponderCapture: (evt, gestureState) => true,
      onMoveShouldSetPanResponder: (evt, gestureState) => true,
      onMoveShouldSetPanResponderCapture: (evt, gestureState) => true,

      onPanResponderGrant: (evt, gestureState) => {
        // The guesture has started. Show visual feedback so the user knows
        // what is happening!
        this.state.pan.setOffset({x: this.state.pan.x._value, y: this.state.pan.y._value});
        this.state.pan.setValue({ x: 0, y: 0 })
        // gestureState.d{x,y} will be set to zero now
      },
      onPanResponderMove: Animated.event([
        null, { dx: this.state.pan.x, dy: this.state.pan.y },
      ]),
      onPanResponderTerminationRequest: (evt, gestureState) => true,
      onPanResponderRelease: (evt, gestureState) => {
        // The user has released all touches while this view is the
        // responder. This typically means a gesture has succeeded
        this.state.pan.flattenOffset()

        const hasSwipedHorizontally = Math.abs(this.state.pan.x._value) > SWIPE_THRESHOLD

        if (hasSwipedHorizontally) {
          const hasSwipedRight = hasSwipedHorizontally && this.state.pan.x._value > 0

          if (hasSwipedRight) {
            this.props.onLike()
          }
        }
        this.resetPan()
      },
      onPanResponderTerminate: (evt, gestureState) => {
        // Another component has become the responder, so this gesture
        // should be cancelled
      },
      onShouldBlockNativeResponder: (evt, gestureState) => {
        // Returns whether this component should block native components from becoming the JS
        // responder. Returns true by default. Is currently only supported on android.
        return true;
      },
    })
  }

  resetPan() {
    Animated.spring(this.state.pan, {
      toValue: { x: 0, y: 0 },
      friction: 4
    }).start()
  }

  render() {
    let { pan } = this.state

    let [translateX, translateY] = [pan.x, pan.y]

    console.log(translateX)

    let animatedStyles = {
      transform: [{translateX}, {translateY}]
    }

    return (
      <Animated.View style={[styles.container, animatedStyles]} {...this._panResponder.panHandlers}>
        <View style={styles.imageContainer}>
          <Image source={{uri: this.props.food.image_url}} resizeMode='cover' style={styles.image}/>
        </View>
        <View style={styles.overlay}>
          <Text style={styles.name}>{this.props.food.name}
            <Text style={styles.rating}>, {this.props.food.rating}</Text>
          </Text>
          <Text>{this.props.food.categories != null ? this.props.food.categories.map(c => c.title).join(', ') : ''}</Text>
        </View>
      </Animated.View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-end'
  },
  imageContainer: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
  overlay: {
    backgroundColor: '#FFFFFF',
    margin: 15,
    padding: 10,
    borderRadius: 5
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black'
  },
  rating: {
    fontWeight: 'normal'
  },
  image: {
    flex: 1,
    borderRadius: 5
  }
})

export default FoodItem