import { Image } from "react-native";
import React from "react";

// the left margin is added because the image seemed offset without it
export default () => {
  return (
    <Image style={{ flex: 1, width: undefined, height: undefined, resizeMode: 'contain', marginLeft:6 }}
           source={require('../assets/images/header.png')}
    />
  )
}