import { DimensionValue, View } from 'react-native'
import React from 'react'
import LottieView from 'lottie-react-native';

interface props {
  size?: number,
  width?: DimensionValue
}

/**
 * A simple loading animation component.
 *
 * @param {{size?: number}} props
 * @returns {JSX.Element} JSX.Element
 */
const Loading: React.FC<props> = ({size, width}) => {
  return (
    <View style={{ height: size, aspectRatio: 1 }}>
      <LottieView style={{ flex: 1, width, alignSelf: "center" }} source={require("../../assets/img/loading_animate.json")} autoPlay loop />
    </View>
  )
}

export default Loading